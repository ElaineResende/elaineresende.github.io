
{/* <PieChart
        width={1200}
        height={800}
        data={[
          { label: "Assamese", count: 13 },
          { label: "Bengali", count: 83 },
          { label: "Bodo", count: 1.4 },
          { label: "Dogri", count: 2.3 },
          { label: "Gujarati", count: 46 },
          { label: "Hindi", count: 300 },
          { label: "Kannada", count: 38 },
          { label: "Kashmiri", count: 5.5 },
          { label: "Konkani", count: 5 },
          { label: "Maithili", count: 20 },
          { label: "Malayalam", count: 33 },
          { label: "Manipuri", count: 1.5 },
          { label: "Marathi", count: 72 },
          { label: "Nepali", count: 2.9 },
          { label: "Oriya", count: 33 },
          { label: "Punjabi", count: 29 },
          { label: "Sanskrit", count: 0.01 },
          { label: "Santhali", count: 6.5 },
          { label: "Sindhi", count: 2.5 },
          { label: "Tamil", count: 61 },
          { label: "Telugu", count: 74 },
          { label: "Urdu", count: 52 }
        ]}
      /> 
      

    // var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    //   width = 960 - margin.left - margin.right,
    //   height = 500 - margin.top - margin.bottom;

    // var x0 = scaleBand().range([0, width]).round(.1);



    // var y = scaleLinear()
    //   .range([height, 0]);

    // var xAxis = axisBottom(x0);

    // var yAxis = axisLeft(y);

    // var color = d3.scaleOrdinal()
    //   .range(["#ca0020", "#f4a582", "#d5d5d5", "#92c5de", "#0571b0"]);

    // svg
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // const data = [
    //   {
    //     "categorie": "Student",
    //     "values": [
    //       {
    //         "value": 0,
    //         "rate": "Not at all"
    //       },
    //       {
    //         "value": 4,
    //         "rate": "Not very much"
    //       },
    //       {
    //         "value": 12,
    //         "rate": "Medium"
    //       },
    //       {
    //         "value": 6,
    //         "rate": "Very much"
    //       },
    //       {
    //         "value": 0,
    //         "rate": "Tremendously"
    //       }
    //     ]
    //   },
    //   {
    //     "categorie": "Liberal Profession",
    //     "values": [
    //       {
    //         "value": 1,
    //         "rate": "Not at all"
    //       },
    //       {
    //         "value": 21,
    //         "rate": "Not very much"
    //       },
    //       {
    //         "value": 13,
    //         "rate": "Medium"
    //       },
    //       {
    //         "value": 18,
    //         "rate": "Very much"
    //       },
    //       {
    //         "value": 6,
    //         "rate": "Tremendously"
    //       }
    //     ]
    //   },
    //   {
    //     "categorie": "Salaried Staff",
    //     "values": [
    //       {
    //         "value": 3,
    //         "rate": "Not at all"
    //       },
    //       {
    //         "value": 22,
    //         "rate": "Not very much"
    //       },
    //       {
    //         "value": 6,
    //         "rate": "Medium"
    //       },
    //       {
    //         "value": 15,
    //         "rate": "Very much"
    //       },
    //       {
    //         "value": 3,
    //         "rate": "Tremendously"
    //       }
    //     ]
    //   },
    //   {
    //     "categorie": "Employee",
    //     "values": [
    //       {
    //         "value": 12,
    //         "rate": "Not at all"
    //       },
    //       {
    //         "value": 7,
    //         "rate": "Not very much"
    //       },
    //       {
    //         "value": 18,
    //         "rate": "Medium"
    //       },
    //       {
    //         "value": 13,
    //         "rate": "Very much"
    //       },
    //       {
    //         "value": 6,
    //         "rate": "Tremendously"
    //       }
    //     ]
    //   },
    //   {
    //     "categorie": "Craftsman",
    //     "values": [
    //       {
    //         "value": 6,
    //         "rate": "Not at all"
    //       },
    //       {
    //         "value": 15,
    //         "rate": "Not very much"
    //       },
    //       {
    //         "value": 9,
    //         "rate": "Medium"
    //       },
    //       {
    //         "value": 12,
    //         "rate": "Very much"
    //       },
    //       {
    //         "value": 3,
    //         "rate": "Tremendously"
    //       }
    //     ]
    //   },
    //   {
    //     "categorie": "Inactive",
    //     "values": [
    //       {
    //         "value": 6,
    //         "rate": "Not at all"
    //       },
    //       {
    //         "value": 6,
    //         "rate": "Not very much"
    //       },
    //       {
    //         "value": 6,
    //         "rate": "Medium"
    //       },
    //       {
    //         "value": 2,
    //         "rate": "Very much"
    //       },
    //       {
    //         "value": 3,
    //         "rate": "Tremendously"
    //       }
    //     ]
    //   }
    // ];

    // var categoriesNames = data.map(function (d) { return d.categorie; });
    // var rateNames = data[0].values.map(function (d) { return d.rate; });

    // x0.domain(categoriesNames);
    // let x1 = scaleOrdinal().domain(rateNames).range([0, x0.bandwidth()]);
    // y.domain([0, d3.max(data, function (categorie) { return d3.max(categorie.values, function (d) { return d.value; }); })]);

    // svg.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis);

    // svg.append("g")
    //   .attr("class", "y axis")
    //   .style('opacity', '0')
    //   .call(yAxis)
    //   .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", ".71em")
    //   .style("text-anchor", "end")
    //   .style('font-weight', 'bold')
    //   .text("Value");

    // svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

    // var slice = svg.selectAll(".slice")
    //   .data(data)
    //   .enter().append("g")
    //   .attr("class", "g")
    //   .attr("transform", function (d) { return "translate(" + x0(d.categorie) + ",0)"; });

    // slice.selectAll("rect")
    //   .data(function (d) { return d.values; })
    //   .enter().append("rect")
    //   .attr("width", 20 + 1 || x1.bandwidth())
    //   .attr("x", function (d) { return x1(d.rate); })
    //   .style("fill", function (d) { return color(d.rate) })
    //   .attr("y", function (d) { return y(0); })
    //   .attr("height", function (d) { return height - y(0); })
    //   .on("mouseover", function (d) {
    //     d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
    //   })
    //   .on("mouseout", function (d) {
    //     d3.select(this).style("fill", color(d.rate));
    //   });

    // slice.selectAll("rect")
    //   .transition()
    //   .delay(function (d) { return Math.random() * 1000; })
    //   .duration(1000)
    //   .attr("y", function (d) { return y(d.value); })
    //   .attr("height", function (d) { return height - y(d.value); });

    // //Legend
    // var legend = svg.selectAll(".legend")
    //   .data(data[0].values.map(function (d) { return d.rate; }).reverse())
    //   .enter().append("g")
    //   .attr("class", "legend")
    //   .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
    //   .style("opacity", "0");

    // legend.append("rect")
    //   .attr("x", width - 18)
    //   .attr("width", 18)
    //   .attr("height", 18)
    //   .style("fill", function (d) { return color(d); });

    // legend.append("text")
    //   .attr("x", width - 24)
    //   .attr("y", 9)
    //   .attr("dy", ".35em")
    //   .style("text-anchor", "end")
    //   .text(function (d) { return d; });

    // legend.transition().duration(500).delay(function (d, i) { return 1300 + 100 * i; }).style("opacity", "1");

      */}
