from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeViewset

#Create  a router and register our viewSet
#instead of manually typing out the URLs for every single action(list,detail,#update etc) we can use the Router to do the heavy lifting .
#Router is a tool in DRF tht automatically maps the b viewset logic to spefici #URL pattern. Without ruter we have to write 5 separate path() lines forevery resource(GET recipes, POST recipes, DELETE recipes etc..)

router = DefaultRouter()

#Tell the router which videset link to which url prefix.
router.register(r'recipes', RecipeViewset, basename='recipe')

#RecipeViewSet - We wrote thi class in views.py - where we use the logic
# inside this ViewSet to handle the requests.
#The API Urls are now determined automatically by the router.

urlpatterns = [
      path('', include(router.urls)),
]


## Router automatically creates the URLS:
## recipes/        -GET  (list - view set action)-  Get all recipes
## recipes/        -POST (create - view set action) - create a new recipe
## recipes/{id}/   -GET  (retrieve - view set action)-  Get one specific record
## recipes/{id}/   -PUT - (update) - Update a recipe
## recipes/{id}/   -DELETE - (destroy) - Delete a recipe
