from django.db import models
from django.contrib.auth.models import User

# Create your models here. Recipe and Ingredient

class Recipe(models.Model):
      
      #This is the link to the user , if user is deleted , then delete their #recipes - CASCADE
      author = models.ForeignKey(User, on_delete=models.CASCADE,   related_name='recipes')

      #Recipe details
      title = models.CharField(max_length=100)
      description = models.TextField(blank= True, null = True)
      instructions = models.TextField()

      create_date = models.DateTimeField(auto_now=True)
      updated_date = models.DateTimeField(auto_now=True)

      def __str__(self):
            return self.title

class Ingredient(models.Model):
      #The link : Every ingredient must belong to a recipe 

      recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')

      name = models.CharField(max_length=100)
      quantity = models.CharField(max_length=50)  # "2", "1/2"
      unit = models.CharField(max_length=50) # 'tsp','cups', 'grams'

      def __str__(self):      
            return f"{self.name} ({self.quantity} {self.unit})"

##on_delete=models.CASCADE: This is a safety feature. If we delete a ##Recipe, Django automatically deletes all the Ingredients associated with ##it so you don't have "orphan" data floating around your database.




