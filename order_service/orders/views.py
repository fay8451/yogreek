from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderListSerializer
import requests
from django.conf import settings

class IsAdminUser:
    def has_permission(self, request, view):
        return request.user and request.user.is_admin

class OrderListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Admin can see all orders, users can only see their own
        if request.user.is_admin:
            orders = Order.objects.all().order_by('-created_at')
        else:
            orders = Order.objects.filter(user_id=request.user.user_id).order_by('-created_at')
        
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        # Set the user_id from the authenticated user
        request.data['user_id'] = request.user.user_id
        
        # Validate the order data
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            # Create the order
            order = serializer.save()
            
            # Update product stock (in a real system, this would be done with a message queue)
            for item in order.items:
                try:
                    # Get the product token from the user service
                    token_response = requests.get(
                        f"{settings.USER_SERVICE_URL}/api/auth/verify/",
                        headers={"Authorization": request.META.get('HTTP_AUTHORIZATION')}
                    )
                    
                    if token_response.status_code == 200:
                        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
                        
                        # Update the product stock
                        requests.put(
                            f"{settings.PRODUCT_SERVICE_URL}/api/products/{item.product_id}/",
                            json={
                                'stock_quantity': -item.quantity  # Decrement by the ordered quantity
                            },
                            headers={"Authorization": f"Bearer {token}"}
                        )
                except Exception as e:
                    # Log the error but don't fail the order
                    print(f"Error updating product stock: {str(e)}")
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, order_id):
        try:
            order = Order.objects.get(order_id=order_id)
            
            # Check if the user is authorized to view this order
            if not request.user.is_admin and order.user_id != request.user.user_id:
                return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
            
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, order_id):
        # Only admin can update orders
        if not request.user.is_admin:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            order = Order.objects.get(order_id=order_id)
            serializer = OrderSerializer(order, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

class OrderStatusView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, order_id):
        try:
            order = Order.objects.get(order_id=order_id)
            return Response({
                'order_id': order.order_id,
                'status': order.status,
                'updated_at': order.updated_at
            }, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

class UserOrdersView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        orders = Order.objects.filter(user_id=request.user.user_id).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)