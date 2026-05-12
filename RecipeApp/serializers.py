from rest_framework import serializers
from .models import Recipe, Ingredient

##======Nested Serializers in Django Rest Framework (DRF)=====#
##Parent object - "Recipe",  Child object - "Ingredient"

##ModelSerializer converts the Ingredient model instances into JSON and ##vice/versa.
# It includes only the fields necessary for an ingredient;it excludes # #the recipe foreign key field because the parent serializer will handle #that relationship automatically.

class IngredientSerializer(serializers.ModelSerializer):
      class Meta:
            model = Ingredient
            fields = ['id', 'name', 'quantity', 'unit']

##===========================================================###
#Setting ingredients to an instance of IngredientSerializer with #many=True tells django that when showing a recipe,look for related #ingredients and use the IngredientSerializer to represent them.
# When receving data expect a list of objects inside an ingredients key.
## Explaining this to convey that a recipe may have multiple ingredients
## So while connecting one recipe it will have multiple ingredients.

class RecipeSerializer(serializers.ModelSerializer):
      # many=True handles the one-to-many relationship
      ingredients = IngredientSerializer(many=True)

      class Meta:
            model = Recipe
            fields = ['id', 'title', 'description', 'instructions', 'ingredients']

##Why do we need the create method?
##we are sending a complex package (a recipe + a list of ingredients), ##we have to manually tell Django: "save the recipe first, then ##take #all those ingredients in the list and link them to the recipe you just #made."

#use .pop() so that validated_data no longer contains the ingredients
      def create (self, validated_data):
            #1.Retrieve the ingredients list out of the incoming data
            ingredients_data = validated_data.pop('ingredients')

            #2.Save the Recipe first# (to get the ID for the Foreign Key)
            recipe = Recipe.objects.create(**validated_data)

            #It saves data (title, description, etc.) to the Recipe table
            #You now have a recipe object with a primary key (ID), which is required to link the ingredients in the next step

            #3. Loop through the list and save each ingredient #dictionary in the list linked to this recipe 
            #This manually injects recipe = recipe into creation process #and sets the foreign key so each ingredient knows which #recipe it belongs to.
            for ingredient_item in ingredients_data:
                  Ingredient.objects.create(recipe=recipe, **ingredient_item)
            
            #Returns the newly created recipe instance so the serializer #can send the full data , includingthe new id's back to the #user as a response.
            return recipe
      
      def update(self, instance, validated_data):
            # Use .pop() with an empty list default to handle partial updates
            ingredients_data = validated_data.pop('ingredients')
            
            # Update recipe fields
            instance.title = validated_data.get('title', instance.title)
            instance.description = validated_data.get('description', instance.description)
            instance.instructions = validated_data.get('instructions', instance.instructions)
            instance.save()

            # Update ingredients: Only if ingredients data was actually provided
            if ingredients_data is not None:
            # Simplest approach: clear old ingredients and re-add new ones
                        instance.ingredients.all().delete()
            
                        for ingredient_item in ingredients_data:
                            Ingredient.objects.create(recipe=instance, **ingredient_item)
            
            return instance



