import React, { Component } from 'react'
import firebase from '../firebase'
var d3 = require("d3");

let data = {
    nodes: [],
    links:[]
}

let actorList = [];
let movieList = [];

export class Nodes extends Component {
    

    drag = (simulation, tooltip) => {
        function dragStarted(d) {
            if(!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; 
            d.fy = d.y; 
        }
        function dragged(d) {
            console.log("dragging")
            //console.log((d3.event.x))
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            tooltip.style("top", (d.fy - 30) + "px").style("left", (d.fx - 20) + "px").style("opacity", 1);
            //tooltip.style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px").style("opacity", 1);
           // tooltip.style("left", (d3.event.pageX) + "px")
             //   .style("top", (d3.event.pageY - 28) + "px");

        }
        //.style("left", (d3.event.pageX) + "px")
        //.style("top", (d3.event.pageY - 28) + "px");
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

        const defs = svg.append("defs");
        
        const link = svg.append("g")
            .attr("stroke", '#999')
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", 1.5);


        const radius = (node) => {
            if(node.group === 'movie')
                return 120;
            return 30;
        }

        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(obj_links).id(d => {return d.name; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2)); //centers it

        const moviePoster = (node) => {
            if(node.group === "movie") {
                defs.append("pattern")
                    .attr("id", node.id)
                    .attr('patternUnits', 'objectBoundingBox')
                    .attr('width', 5)
                    .attr('height', 5)
                .append("image")
                    .attr("xlink:href", node.img)
                    .attr("width", 400)
                    .attr("height", 400)
                    .attr("x", -75)
                    .attr("y", -30);
                return "url(#"+node.id+")"
            }
            return d3.color("#ededed");
        }

        var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            //.style("visibility", "hidden")
            .style("opacity", 0)
            .style("background-color", "#f6f6f5")
            .style("width", "150px")
            .style("text-align", "center")
            .style("font-weight", "bolder")
            .style("color", "black")
            .style("border", "solid")
            .style("border-color", "#999")
            .style("border-width", "1px")
            .style("border-radius", "3px");

        // shows actor name on hover
        var mouseHover = function(node) {
            console.log("mouse hover")
            if(node.group === "actor") {
                tooltip.transition()
                    .duration(200)
                tooltip.html(node.name)
                    .style("opacity", 1)
                    .style("stroke", "black")
                
            }
        }

        var mouseMove = function(node) {
            if(node.group === "actor") {
                tooltip.html(node.name)
                    .style("opacity", 1)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            } 
        }

        var mouseOut = function(node) {
            if(node.group === "actor") {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0)
            }
        }

        svg.append('defs')
            .selectAll('pattern')
            .data(obj_nodes)
            .enter()
            .append("pattern")
            .attr('id', function(d) {
                return 'id-'+d.id;
            })
            .attr('patternUnits', 'objectBoundingBox')
            .attr('width', 1)
            .attr('height', 1)
            .append('image')
            .attr('xlink:href', moviePoster)
            .attr('x', -35)
            .attr('y', -35)
            .attr('width', 220)
            .attr('height', 220);
            
    
        const node = svg.append("g")
            .attr("stroke", '#999')
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", radius)
            .attr("cursor", "pointer")
            .attr("fill", moviePoster)
            .on("mouseover", mouseHover)
            .on("mousemove", mouseMove)
            .on("mouseout", mouseOut)
            .call(this.drag(simulation, tooltip));


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

    async componentDidMount() {
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
        // fetch all the data from firebase 
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
                if(movieList.includes(graphData[item].name)) {
                    console.log("already added")
                } else {
                    movieList.push(graphData[item].name) 
                    let movieItem = {
                        name: graphData[item].name,
                        img: graphData[item].img,
                        group: 'movie',
                        id: graphData[item].movieID
                    }
                    // add a movie node
                    data.nodes.push(movieItem);
                }

                // add actor nodes
                let actors = graphData[item].actors.split(', '); 
                for(let i in actors) {
                    //console.log("current actor...", actors[i])
                    //console.log(actorList)
                    if(actorList.includes(actors[i])) {
                        console.log("already added")
                    } else {
                        actorList.push(actors[i])
                        let currActor = {
                            name: actors[i],
                            group: 'actor',
                            //id: graphData[item].movieID
                        }
                        data.nodes.push(currActor)
                        //create links
                        
                    }
                    //if(data.links.map(function(e) { return e.target}).indexOf(actors[i]) <= -1 && data.links.map(function(e) { return e.source}).indexOf(graphData[item].name) <= -1) {
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