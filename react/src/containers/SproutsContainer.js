import React, { Component } from 'react';
import RandomSprout from '../components/RandomSprout';
import SproutsIndex from '../components/SproutsIndex';
import LongestRecipe from '../components/LongestRecipe';

class SproutsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: "",
      recipes: [],
      longest: ""
    }
  }

  getLongestRecipe(){
    fetch('http://localhost:4567/api/v1/longest-recipe')
      .then(response => response.json())
      .then(body => this.setState({
        longest: body,
        recipe: "",
        recipes: []
      }))
  }

  getRandomRecipe(){
    fetch('http://localhost:4567/api/v1/random-recipe')
      .then(response => response.json())
      .then(body => this.setState({
        recipe: body,
        recipes: [],
        longest: ""
      }))
  }

  getAllRecipes(){
    fetch('http://localhost:4567/api/v1/recipes')
      .then(response => response.json())
      .then(body => this.setState({
        recipes: body,
        recipe: "",
        longest: ""
      }))
  }

  render(){

    let handleRandomClick = () => {
      this.getRandomRecipe();
    }

    let handleIndexClick = () => {
      this.getAllRecipes();
    }

    let handleLongestClick = () => {
      this.getLongestRecipe();
    }

    return(
      <div className="container">
        <h1>Sprout Fetcher</h1>
        <RandomSprout
          recipe={this.state.recipe}
          handleClick = {handleRandomClick}
        />
        <SproutsIndex
          recipes={this.state.recipes}
          handleClick={handleIndexClick}
        />
        <LongestRecipe
          recipe={this.state.longest}
        />

        <div className="buttons">
          <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

          <button onClick={handleIndexClick} className="btn">See All Recipes</button>

          <button onClick={handleLongestClick} className="btn">Get Longest Recipe</button>
        </div>
      </div>
    )
  }
}

export default SproutsContainer;
