import React, { Component } from 'react';
import './maincontainer.css';
// import { config } from '../fconfig';
import firebase from 'firebase';




class Maincontainer extends Component {
  constructor(){
    super();
    this.state = {
      result:{
      "title":"NO State",
      "name":" No State"
      }
    }
  }

  componentDidMount(){
    firebase.database().ref('filmOn').on('value', (data) =>{
      var result = data.toJSON();
      this.setState({result})
    });
  }
 
  
  render() {
    //console.log("Inside Render",this.state);
    const data = this.state.result;
   
    //console.log(data)
      return(
        <div className="maincontainer">
          {Object.keys(data).map(key=>{
             const films = data[key];
             return(
               <div className="boxt">
                  <div> <img src={films.imagelink} alt={"/limages/dummy.jpg"}/> </div>
                  <div><h1>{films.title}</h1> </div>
                  <div><h2>Released in {films.release} </h2></div>
                  <div><h2>Rating : {films.rating} </h2></div>
              
              </div>
              )
          })}
        </div>
      )
      
  }
}

export default Maincontainer

/*
Object.keys(data).map(key=>{
         
       <div>
    
                <h1>{films.title}</h1>
  

       </div>)})
  {

    //console.log(firebase);
    
      
     var keys = Object.keys(result);
      console.log(keys);
      console.log(result);
      for(var i=0;i<keys.length;i++){
        var k = keys[i];
        console.log(result[k]);
      } 
       <div className="container"> 
       <div className="box">
        
        </div>
       </div>

        {this.state.map(resu => 
        
        {resu.title}
       
       )}
       <div onLoad={this.handleClick}>
        
        {
          Object.keys(data).map(key=>{
            const films = data[key];
            return(
              <div>
                <h1>{films.title}</h1>
              </div>
            );
          })
        }

      </div>
     
       
       Object.keys(data).map(key=>{
          const films = data[key];
          return(
            <div>
              <h1>{films.title}</h1>
            </div>
          );
        })
      
      
    })
   

  }*/