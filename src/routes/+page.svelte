<script lang='ts'>
	// import { onMount } from 'svelte';
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

    const width = 300;
    const height = 300;

    const spiral: [number, number][] = [
        [0, 100],
        [Math.PI / 4., 100],
        [Math.PI / 2., 100],
        [3. * Math.PI / 4., 100],
        [Math.PI, 100],
        [5. * Math.PI / 4., 100],
        [3. * Math.PI / 2., 100],
        [7. * Math.PI / 4., 100],
    ]

    const rScale = d3.scaleLinear()
        .domain([0, 150])
        .range([0, 100]);

    const rTicks = rScale.ticks(5);

    const line = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => rScale(d[1]))
        (spiral);

    
    const refAngles = Array.from({ length: 8 }, (_, i) => 45*i);
    const minorRefAngles = Array.from({ length: 24}, (_, i) => 15*i);
    const asRadians = (angle: number) => (angle / 360.) * 2. * Math.PI; 
    console.log(refAngles);
    refAngles.forEach( (theta) => {
        console.log(theta, asRadians(theta));
    });
    const computeTextTransform = (angle:number): string | null => {
        return (angle > 90 && angle < 270) ? "rotate(180) translate(-16)" : null;
    }
    const computeTextAnchor = (angle: number): string | null => {
        return (angle > 90 && angle < 270) ? "end" : null;
    }

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
        {width}
        {height}
        style="font: 10px sans-serif;"
        stroke-linecap="round"
        stroke-linejoin="round"
    > 
        <g transform={`translate(${width/2.}, ${height/2.})`}>
            <g class="x-axis">
                {#each rTicks as rad (rad)}
                    <circle 
                        class="radial-axis"
                        cx=0
                        cy=0
                        r={rScale(rad)}
                        fill="none"
                        stroke="#ccc"
                    />
                {/each}
                {#each minorRefAngles as minorTheta (minorTheta)}
                    <line
                        x1={Math.cos(asRadians(minorTheta)) * 94}
                        y1={Math.sin(asRadians(minorTheta)) * 94}
                        x2={Math.cos(asRadians(minorTheta)) * 96}
                        y2={Math.sin(asRadians(minorTheta)) * 96}
                        stroke="#ccc"
                    />
                {/each}
                {#each refAngles as theta (theta)}
                    <line
                        x1=0
                        y1=0
                        x2={Math.cos(asRadians(theta)) * 100}
                        y2={Math.sin(asRadians(theta)) * 100}
                        stroke="#ccc"
                    />
                    <g
                        transform={`rotate(${theta}) translate(100, 0)`}
                    >
                        <text
                            x=8
                            dy="0.35em"
                            transform={computeTextTransform(theta)}
                            text-anchor={computeTextAnchor(theta)}
                        >
                            {(360 - theta) % 360}
                        </text>
                    </g>
                {/each}
            </g>
            <path
                class="area-path area-path-2"
                d={line}
                fill="none"
                stroke="steelblue"
                stroke-width="2"
                
            />
        </g>
    </svg>
</div>