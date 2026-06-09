<script lang='ts'>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	// let {data } = $props();
    // let data = {
    //     angles: [0, Math.PI / 2., Math.PI, 3. * Math.PI / 2.],
    //     tensile_stiffness: [10, 20, 17.5, 15]
    // };

    // const x = data.angles;
    // const tensile_stiffness: number[] = data.tensile_stiffness;
    // const xy: [number, number][] = x.map((angle: number, idx: number) => [angle, tensile_stiffness[idx]] );

    // const width = 928;
    // const height = width;
    // const margin = 10;
    // const innerRadius = width / 5;
    // const outerRadius = width / 2 - margin;
    // const min: number = d3.min(tensile_stiffness) as number;
    // const max: number = d3.max(tensile_stiffness) as number;

    // const y = d3.scaleRadial()
    //     .domain([min, max])
    //     .range([innerRadius, outerRadius]);

    // const line = d3.lineRadial()
    //     .curve(d3.curveLinearClosed)
    //     (xy);

    // const area = d3.areaRadial()
    //     .curve(d3.curveLinearClosed)
    //     .angle(d => x(d.date));

    // svg.append("path")
    //     .attr("fill", "lightsteelblue")
    //     .attr("fill-opacity", 0.2)
    //     .attr("d", area
    //         .innerRadius(d => y(d.minmin))
    //         .outerRadius(d => y(d.maxmax))
    //         (data));

    // svg.append("path")
    //     .attr("fill", "steelblue")
    //     .attr("fill-opacity", 0.2)
    //     .attr("d", area
    //         .innerRadius(d => y(d.min))
    //         .outerRadius(d => y(d.max))
    //         (data));

    // svg.append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "steelblue")
    //     .attr("stroke-width", 1.5)
    //     .attr("d", line
    //         .radius(d => y(d.avg))
    //         (data));

    // svg.append("g")
    //     .selectAll()
    //     .data(x.ticks())
    //     .join("g")
    //     .each((d, i) => d.id = DOM.uid("month"))
    //     .call(g => g.append("path")
    //         .attr("stroke", "#000")
    //         .attr("stroke-opacity", 0.2)
    //         .attr("d", d => `
    //             M${d3.pointRadial(x(d), innerRadius)}
    //             L${d3.pointRadial(x(d), outerRadius)}
    //         `))
    //     .call(g => g.append("path")
    //         .attr("id", d => d.id.id)
    //         .datum(d => [d, d3.utcMonth.offset(d, 1)])
    //         .attr("fill", "none")
    //         .attr("d", ([a, b]) => `
    //             M${d3.pointRadial(x(a), innerRadius)}
    //             A${innerRadius},${innerRadius} 0,0,1 ${d3.pointRadial(x(b), innerRadius)}
    //         `))
    //     .call(g => g.append("text")
    //         .append("textPath")
    //         .attr("startOffset", 6)
    //         .attr("xlink:href", d => d.id.href)
    //         .text(d3.utcFormat("%B")));

    // svg.append("g")
    //     .attr("text-anchor", "middle")
    //     .selectAll()
    //     .data(y.ticks().reverse())
    //     .join("g")
    //     .call(g => g.append("circle")
    //         .attr("fill", "none")
    //         .attr("stroke", "currentColor")
    //         .attr("stroke-opacity", 0.2)
    //         .attr("r", y))
    //     .call(g => g.append("text")
    //         .attr("y", d => -y(d))
    //         .attr("dy", "0.35em")
    //         .attr("stroke", "#fff")
    //         .attr("stroke-width", 5)
    //         .attr("fill", "currentColor")
    //         .attr("paint-order", "stroke")
    //         .text((x, i) => `${x.toFixed(0)}${i ? "" : "°F"}`)
    //         .clone(true)
    //         .attr("y", d => y(d)));
    const spiral: [number, number][] = Array.from({ length: 76 }, (_, i) => [
        (Math.PI / 3) * i, // angle (in radians)
        2 * i // radius
    ])
    const line = d3.lineRadial()(spiral);
	
	// let el: HTMLDivElement;
    // const textFn: d3.ValueFn<HTMLDivElement, unknown, string> = (d) => d as string;

	// onMount(() => {
	// 	d3.select(el)
	// 		.selectAll("div")
	// 		.data(data.angles)
	// 		.enter()
	// 		.append("div")
	// 		.style("width", function(d) {
	// 			return d + "px";
	// 		})
	// 		.text(textFn);
	// });
</script>

<div id="chart">
    <svg
        width={300}
        height={300}
        style="width: 100%; height: auto; font: 10px sans-serif;"
        stroke-linecap="round"
        stroke-linejoin="round"
    > 
        <path
            class="area-path area-path-2"
            d={line}
            fill="none"
            stroke="steelblue"
            stroke-width="2"
            transform="translate(150,150)"
        />
    </svg>
</div>