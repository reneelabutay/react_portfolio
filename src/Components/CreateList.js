import React, { Component } from 'react'
import { MdAddCircle } from 'react-icons/md'

export class CreateList extends Component {
    constructor() {
        super();
        this.state = {
            listName: '',
            allLists: []
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
       let joinElement = this.state.allLists.concat(this.state.listName);
       this.setState({ allLists: joinElement })
    }

    render() {
        console.log("allLists[]...")
        console.log(this.state.allLists)
        return(
            <div>
                <div className="page-body">
                    <form className="add-movie-form" onSubmit={this.handleCreateList}>
                        <label>Create a Movie List</label>
                        <p className="add-movie">
                            <button type="submit" className="add-movie-button">
                                    <MdAddCircle size={24}/>
                            </button>
                            <input type="text" name="listName" placeholder="Enter list title..."
                            onChange={this.handleChange} value={this.state.listName}></input>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
export default CreateList;