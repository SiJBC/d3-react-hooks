
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { select, line, curveCardinal, axisBottom, scaleLinear, axisRight } from "d3"


function App() {
  const [data, setData] = useState([20, 10 ,30, 45, 60 , 75, 105, 45])
  const svgRef = useRef()
  useEffect(() => {
    const svg = select(svgRef.current)
    
    const xScale = scaleLinear()
    .domain([0, data.length-1])
    .range([0, 300])

    const yScale = scaleLinear()
    .domain([0, 110])
    .range([150, 0])

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index +1)
    svg.select(".x-axis")
    .call(xAxis)
    .style("transform", "translateY(150px")

    const yAxis = axisRight(yScale)
    svg.select(".y-axis")
    .style("transform", "translateX(300px)")
    .call(yAxis)
   

    const myLine = line()
    .x((d, index) => xScale(index))
    .y(yScale)
    .curve(curveCardinal)
  // svg.selectAll("circle")
  //   .data(data)
  //   .join("circle").attr("r", d => d)
  //   .attr("cx", d => d *2)
  //   .attr("cy", d => d *2)
  //   .attr("stroke", "red")
  svg.selectAll(".line").data([data])
  .join("path")
  .attr("d", myLine)
  .attr("fill", "none")
  .attr("stroke", "blue")
  }, [data])
  
  return (
    <div> 
        <svg ref={svgRef}>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </svg>
        <br>
        </br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button onClick ={() => setData(data.map(value => value + 5))}>Update Data</button>
        <button onClick ={() => setData(data.filter(value => value < 35))}>Filter Data</button>
    </div>
  
  );
}

export default App;
