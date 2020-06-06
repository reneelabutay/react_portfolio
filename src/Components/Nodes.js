import React, { Component } from 'react'
import firebase from '../firebase'
var d3 = require("d3");

let demo = {
    nodes: [
        {
            name: 'movie 1', 
            group: 1
        }, 
        {
            name: 'movie 2',
            group: 2
        }
    ],
    links: [
        {
            source: 1,
            target: 0,
            value: 1
        }

    ]
}

let data2 = {
    nodes: [
    {
        name: 'The Other Guys',
        group: 'movie'
    },
    {
        name: 'Will Ferrell',
        group: 'actor'
    }, 
    {
        name: 'Derek Jeter',
        group: 'actor'
    }, 
    {
        name: 'Mark Wahlberg',
        group: 'actor'
    }
    ],
    links: [
         {
             source: 'The Other Guys',
             target: 'Will Ferrell'
         },
         {
             source: 'The Other Guys',
             target: 'Derek Jeter'
         }, 
         {
             source: 'The Other Guys',
             target: 'Mark Wahlberg'
         }
    ]
}

let data = {
    nodes: [],
    links:[]
}

let actorList = [];

export class Nodes extends Component {
    constructor() {
        super();
        this.state = {
            nodesLoaded: false,
            linkedLoaded: false
        }
    }

    drag = (simulation) => {
        function dragStarted(d) {
            if(!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; 
            d.fy = d.y; 
        }
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        function dragEnded(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);
    } 

    chart(nodes, links) {
        const width = 1920;
        const height = 1920;

        const obj_links = links.map(d => Object.create(d));
        const obj_nodes = nodes.map(d => Object.create(d));
        
        const svg = d3.create("svg")
            .attr("viewBox", [0,0,width,height]);
        
        const link = svg.append("g")
            .attr("stroke", '#999')
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", 1);

        const color = (node) => {
            if(node.group === 'movie' ) // it's a movie name
                return node.img;
            return d3.color("pink");
        }

        const radius = (node) => {
            if(node.group === 'movie')
                return 40;
            return 20;
        }
        //.force("link", d3.forceLink().links(obj_links).id(d => {return d.index; }).distance(200))
        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(obj_links).id(d => {return d.name; }).distance(200))
            //.force("link", d3.forceLink().links(obj_links).id(d => {return d.name; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2)); //centers it

        const node = svg.append("g")
            .attr("stroke", '#fff')
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", radius)
            //.attr("fill", color)
            .attr("fill", function(d) {
                if(d.group === 'movie') {
                    return "url(#" + d.img + ")";
                }
                return d3.color("pink");
            })
            .call(this.drag(simulation));

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });  

        return svg.node();
    }
    /*
    async loadData() {
        const pairsRef = await firebase.database().ref('MovieListPairs');
        let ids = [];
        await pairsRef.on('value', (snapshot) => {
            let pairs = snapshot.val();
            for(let item in pairs) {
                if(pairs[item].listName === 'GraphViz') {
                    ids.push(pairs[item].movieID)	
				}
            }
        });
        let graphData = []; 
        // fetch all the data needed for the graph 
        const dataRef = await firebase.database().ref('MovieList');
        await dataRef.on('value', (snapshot) => {
            let movieData = snapshot.val();
            for(let item in movieData) {
                if(ids.indexOf(movieData[item].movieID) > -1) {
                    graphData.push({
                        name: movieData[item].title,
                        actors: movieData[item].actors,
                        movieID: movieData[item].movieID
                    })
                }
            }
            for(let item in graphData) {
                let movieItem = {
                    name: graphData[item].name,
                    group: 'movie',
                    //movieID: graphData[item].movieID
                }
                // add a movie node
                data.nodes.push(movieItem);
                // add actor nodes
                let actors = graphData[item].actors.split(', '); 
                for(let i in actors) {
                    if(actorList.map(function(e) { return e.actor}).indexOf(actors[i]) <= -1) {
                        actorList.push({
                            name: actors[i],
                            index: actorList.length
                        })
                        let currActor = {
                            name: actors[i],
                            group: 'actor',
                            //id: graphData[item].movieID
                        }
                        data.nodes.push(currActor)
                    }
                    //create links
                    let linkItem = {
                        source: graphData[item].name, //movie
                        target: actors[i] //actor
                    }
                    data.links.push(linkItem);
                } 
            }
            console.log("data.nodes", data.nodes)
            console.log("link nodes", data.links)
        });
    }*/

    async componentDidMount() {
        //await this.loadData();
        const pairsRef = await firebase.database().ref('MovieListPairs');
        let ids = [];
        await pairsRef.on('value', (snapshot) => {
            let pairs = snapshot.val();
            for(let item in pairs) {
                if(pairs[item].listName === 'GraphViz') {
                    ids.push(pairs[item].movieID)	
				}
            }
        });
        let graphData = []; 
        // fetch all the data needed for the graph 
        const dataRef = await firebase.database().ref('MovieList');
        await dataRef.on('value', (snapshot) => {
            let movieData = snapshot.val();
            for(let item in movieData) {
                if(ids.indexOf(movieData[item].movieID) > -1) {
                    graphData.push({
                        name: movieData[item].title,
                        actors: movieData[item].actors,
                        movieID: movieData[item].movieID,
                        img: movieData[item].poster
                    })
                }
            }
            for(let item in graphData) {
                let movieItem = {
                    name: graphData[item].name,
                    img: graphData[item].img,
                    group: 'movie',
                    //movieID: graphData[item].movieID
                }
                // add a movie node
                data.nodes.push(movieItem);
                // add actor nodes
                let actors = graphData[item].actors.split(', '); 
                for(let i in actors) {
                    if(actorList.map(function(e) { return e.actor}).indexOf(actors[i]) <= -1) {
                        actorList.push({
                            name: actors[i],
                            index: actorList.length
                        })
                        let currActor = {
                            name: actors[i],
                            group: 'actor',
                            //id: graphData[item].movieID
                        }
                        data.nodes.push(currActor)
                    }
                    //create links
                    let linkItem = {
                        source: graphData[item].name, //movie
                        target: actors[i] //actor
                    }
                    data.links.push(linkItem);
                } 
            }
            console.log("data.nodes", data.nodes)
            console.log("link nodes", data.links)

            const element = document.getElementById("mysvg")
            element.appendChild(this.chart(data.nodes, data.links));
        });
    }

    render() {
        return(
            <div id="mysvg"></div>
        )
    }
}
export default Nodes;