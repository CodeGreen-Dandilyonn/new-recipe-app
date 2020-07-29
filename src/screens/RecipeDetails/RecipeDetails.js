import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import RecipeIngredients from '../../components/RecipeIngredients/RecipeIngredients';
import RecipeDetailIcons from '../../components/RecipeDetailIcons/RecipeDetailIcons';
import RecipeInstructions from '../../components/RecipeInstructions/RecipeInstructions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LeafTag from '../../components/LeafTag/LeafTag';

export default ({ route }) => {

    const id = route.params.id;
    const navigation = useNavigation();
    const APIKEY = 'f3edcb690303427c8511a070b39a73de';
    const [isLoading, setIsLoading] = useState(false); // change to true
    // const [recipe, setRecipe] = useState(null);

    const parseIngredients = (recipeIngredients) => {
        let array = [];
        for (let ingredient of recipeIngredients) {
            array.push(ingredient.original);
        }
        return array;
    }

    const parseInstr = (instructions) => {
        return !instructions ? '' : instructions;
    }

    // useEffect(() => {
    //     const getRecipe = async (id) => {
    //         console.log("recipe id inside = " + route.params.id);
    //         await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${APIKEY}`)
    //             .then((res) => res.json())
    //             .then((resJson) => {
    //                 setRecipe({
    //                     id: id,
    //                     title: resJson.title,
    //                     imageUrl: resJson.image,
    //                     sourceUrl: resJson.sourceUrl,
    //                     servings: resJson.servings,
    //                     readyInMin: resJson.readyInMinutes,
    //                     pricePerServing: (parseFloat(resJson.pricePerServing) / 100).toFixed(2),
    //                     ingredients: parseIngredients(resJson.extendedIngredients),
    //                     instructions: parseInstr(resJson.instructions),
    //                     vegetarian: resJson.vegetarian,
    //                     vegan: resJson.vegan
    //                 })
    //                 console.log("setting recipes = " + resJson);

    //             })
    //             .then(() => setIsLoading(false))
    //             .catch((error) => {
    //                 console.log('error = ' + error);
    //                 setIsLoading(true);
    //             });


    //     };

    //     getRecipe(id.toString());
    // }, []);

    // TODO: upload icon

    const recipe = {
        id: 324694,
        title: 'Vegan Buckwheat Pancakes',
        imageUrl: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=828&q=80',
        sourceUrl: 'http://www.foodnetwork.com/recipes/bobby-flay/silver-dollar-buttermilk-pecan-pancakes-with-bourbon-molasses-butter-and-maple-syrup.html',
        servings: 6,
        ingredients: ['1 tsp baking powder', '1 tbsp butter', '2 cups flour', '1/2 cup sugar', '1 cup pecans', '3/4 cup buttermilk', '3 tbsp maple syrup', '1 tsp salt', '2 eggs'],
        prepTime: 20,
        cookTime: 35,
        readyInMin: 55,
        pricePerServing: 1.08,
        vegetarian: false,
        vegan: true,
        instructions: 'Preheat the oven to 200 degrees F.                          Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl. Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl. Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix. Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using.                          Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer. Transfer the pancakes to a platter and keep warm in a 200 degree F oven.                          Serve 6 pancakes per person, top each with some of the bourbon butter. Drizzle with warm maple syrup and dust with confectioners sugar. Garnish with fresh mint sprigs and more toasted pecans, if desired.                          Bourbon Molasses Butter:                          Combine the bourbon and sugar in a small saucepan and cook over high heat until reduced to 3 tablespoons, remove and let cool.                          Put the butter, molasses, salt and cooled bourbon mixture in a food processor and process until smooth. Scrape into a bowl, cover with plastic wrap and refrigerate for at least 1 hour to allow the flavors to meld. Remove from the refrigerator about 30 minutes before using to soften.'
    }

    if (isLoading) {
        return (
            <View>
                <Text style={styles.loading}>Loading</Text>
            </View>
        )
    } else {
        return (
            <ScrollView style={styles.container}>

                {/* header */}
                {!recipe.vegetarian && !recipe.vegan ? (
                    <View>
                        <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.goBack()} >
                            <Image style={styles.arrow} source={require('../../../assets/arrow.png')} />
                        </TouchableOpacity>
                        <View style={styles.header}>

                            <Text style={styles.recipeTitle}>{recipe.title}</Text>
                        </View>

                    </View>


                ) : (
                        <View style={styles.headerLeaf}>
                            <TouchableOpacity style={styles.arrowContainerLeaf} onPress={() => navigation.goBack()} >
                                <Image style={styles.arrowLeaf} source={require('../../../assets/arrow.png')} />
                            </TouchableOpacity>
                            <Text style={styles.recipeTitle}>{recipe.title}</Text>
                            <LeafTag />
                        </View>

                    )}

                {/* image */}
                {recipe.imageUrl ? (
                    <Image style={styles.recipeImage} source={{ uri: recipe.imageUrl }} />

                ) : (
                        <View style={styles.noImageContainer}>
                            <Text style={styles.noImage}>No available image.</Text>
                        </View>
                    )}

                {/* ingredients */}
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.ingredientsTimeContainer}>
                    <RecipeIngredients ingredients={recipe.ingredients} />
                    <RecipeDetailIcons readyInMin={recipe.readyInMin} pricePerServing={recipe.pricePerServing} />
                </View>

                {/* instructions */}
                <Text style={styles.sectionTitle}>Instructions</Text>
                {recipe.instructions ? (
                    <View>
                        <RecipeInstructions instructions={recipe.instructions} />
                    </View>

                ) : (
                        <View>
                            <Text style={{ ...styles.instructionText, ...styles.noInstr }}>No available instructions.</Text>
                        </View>

                    )}

            </ScrollView>
        )

    }


}