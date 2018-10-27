import React, { Component } from "react";
import axios from "axios";
//import { config } from "./fconfig";
import firebase from "firebase/app";
import './scrapout.css'

class Scrapout extends Component {
  constructor() {
    super();
    this.state = {
      searchWord: "",
      result: {
        title: "",
        release: "",
        rating: "",
        imagePoster: ""
      }
    };
  }
  

  /*
  componentDidMount() {
    firebase.initializeApp(config);
  }
  componentDidMount(){
    axios.get(`/api/customers`)
    .then(res=> res.data )
    .then(customers=> this.setState({customers}, ()=>console.log('sCustomers fetehces',customers)))
    .catch(err=>console.log(err));
  }
  componentDidMount(){
    console.log(this.state.searchWord);
    var name="spygame"
    axios.get(`/api/scrap/${name}`)
    .then(res => res.data)
    .then(result=> this.setState({result}, ()=>console.log('sCustomers fetehces',result)))
    .catch(err=>console.log(err));
  }*/
  handleOf = event => {
    event.preventDefault();
    //console.log(this.state.searchWord);
    var name = this.state.searchWord;
    //console.log(typeof(name));
    firebase
      .database()
      .ref("filmOn")
      .orderByChild("name")
      .equalTo(name)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          console.log("Data from Firebase Database");
          const userData = snapshot.val();
          var k = Object.keys(userData);
          var rtitle = userData[k].title;
          var rrelease = userData[k].release;
          var rrating = userData[k].rating;
          var rimagePoster = userData[k].imagelink;
          this.setState({
            result: {
              title: rtitle,
              release: rrelease,
              rating: rrating,
              imagePoster: rimagePoster
            }
          });

          //console.log(userData[k].title);
          //console.log(k);
          //console.log("exists!", userData);
        } else {
          console.log("not in firebase");
          axios
            .get(`/api/scrap/${name}`)
            .then(res => res.data)
            .then(result =>
              this.setState({ result }, this.firebaseCon, () =>
                console.log("sCustomers fetehces", result)
              )
            )
            .catch(err => console.log(err));
        }
      });
  };
  firebaseCon = () => {
    var titleF = this.state.result.title;
    var releaseF = this.state.result.release;
    var ratingF = this.state.result.rating;
    var imagelinkF = this.state.result.imagePoster;
    var nameF = this.state.searchWord;
    firebase
      .database()
      .ref("filmOn")
      .orderByChild("name")
      .equalTo(nameF)
      .once("value", snapshot => {
        if(snapshot.exists()) {
        console.log("Data exists in Firebase so not saving");  
        }
        else{
          firebase
            .database()
            .ref("filmOn")
            .push({
              title: titleF,
              release: releaseF,
              rating: ratingF,
              imagelink: imagelinkF,
              name: nameF
            })
            .then(() => {
              console.log("Saved to firebase");
            })
            .catch(err => console.log(err));
          }

      });

   
  }

  handleChange = event => {
    this.setState({ searchWord: event.target.value });
  };
  render() {
    //console.log(this.state);
    return (
      <div className="scrapcontainer">
        <form onSubmit={this.handleOf}>
          <input
            name="name"
            placeholder="Enter Film Name to Scrap from IMDB"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button type="submit" className="bn">Search</button>
        </form>

        <div className="box">
        <div>
          <img
            src={this.state.result.imagePoster}
            alt={"./components/layout/limages/dummy.png"}
          />
        </div>
        <div><h3>{this.state.result.title}</h3></div>
        <div><h3>{this.state.result.release}</h3></div>
        <div><h3>{this.state.result.rating}</h3></div>
        
        </div>
      </div>
    );
  }
}

export default Scrapout;
