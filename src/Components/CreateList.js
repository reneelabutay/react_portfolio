import React, { Component } from 'react'
import { MdAddCircle } from 'react-icons/md'
import firebase from '../firebase'

export class CreateList extends Component {
    constructor() {
        super();
        this.state = {
            listName: '',
            //listID: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateList = this.handleCreateList.bind(this);
    }

    handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

    handleCreateList(e) {
        e.preventDefault();
        let newList = this.state.listName;
        const listData = firebase.database().ref('Lists');
        var duplicates = false;
        var numLists = 0;
		listData.on('value', (snapshot) => {
            let movieLists = snapshot.val();
            numLists = snapshot.numChildren();
            console.log(numLists)
			for (let list in movieLists) {
				if(movieLists[list].listName ==  newList) {
					duplicates = true;
					break;
				}
            }

        });
        //console.log("numLists after loop..")
        //console.log(numLists)

        var listItem = {
            listName: newList,
        }
        console.log("listItem")
        console.log(listItem)
        
        if(duplicates){
            alert("ERROR: This list has already been created.");
        } else {
            listData.push(listItem)
            this.setState({
                listName: '',
                //listID: ''
            })
            alert("List was successfully created!")
        } 
    }
    

    render() {
        //console.log("allLists[]...")
       // console.log(this.state.listName)
        return(
            
                    <form className="add-movie-form" id="create-list" onSubmit={this.handleCreateList}>
                        <p className="create-list">
                       
                            <button type="submit" className="add-movie-button" id="create-list-button">
                                    <MdAddCircle size={24}/>
                            </button>
                            <input type="text" name="listName" id="create-list-input" placeholder="Enter your list title here!"
                            onChange={this.handleChange} value={this.state.listName}></input>
                        </p>
                    </form>
        
        );
    }
}
export default CreateList;