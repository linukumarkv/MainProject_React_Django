from rest_framework import viewsets, permissions
from .models import Recipe

from .serializers import RecipeSerializer

# Create your views here. usage of view set automatically provides
# 'list', 'create','retrieve', update and desctroy actions.

class RecipeViewset(viewsets.ModelViewSet):
      serializer_class = RecipeSerializer

      #Only loggedin users can access the cookbook.
      permission_classes= [permissions.IsAuthenticated]

      def get_queryset(self):
            
            #Only return the recipes where the author is the person logged in.
            return  Recipe.objects.filter(author=self.request.user)
      
      def perform_create(self,serializer):
            #When saving a new recipe, automtically set the 'author' to the #current user making the request.
            serializer.save(author=self.request.user)
