<script lang='ts'>
	import * as d3 from 'd3';
    import {asRadians} from './utils';
    import { FlowerGraphData } from './types';
    import type { FlowerGraphProps } from './types';

    let {
        height=300,
        width=300,
        r,
        theta,
        isDegrees,
        numRadialTicks=5,
        numAngularTicks=8
    }:FlowerGraphProps = $props();

    // const rMin: number = $derived(d3.min(r) as number);
    const rMax: number = $derived(1.2 * (d3.max(r) as number));
    const targetRMax = $derived(0.4 * width)
    const rScale = $derived(d3.scaleLinear()
            .domain([0, rMax])
            .range([0, targetRMax])
    );

    const rTickIncrement = $derived(rMax / numRadialTicks);
    const rTicks = $derived(Array.from({length: numRadialTicks}, (_, i) => rTickIncrement * (i + 1)));
    // console.log(rMax, targetRMax);
    // console.log(rScale(rMax));
    // console.log(rTicks);
    const flowerGraphData = $derived(new FlowerGraphData(
        r, theta, isDegrees
    ));
    // console.log(flowerGraphData.data());

    const line = $derived(d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => rScale(d[1]))
        (flowerGraphData.data())
    );

    const majorRefAngleIncrement = $derived(360 / numAngularTicks);
    const majorRefAngles = $derived(Array.from({ length: numAngularTicks }, (_, i) => majorRefAngleIncrement * i));
    
    const minorRefAngleIncrement = $derived(120 / numAngularTicks);
    const minorRefAngles = $derived(Array.from({ length: 3*numAngularTicks}, (_, i) => minorRefAngleIncrement*i));

    const computeTextTransform = (angle:number): string | null => {
        return (angle > 90 && angle < 270) ? "rotate(180) translate(-16)" : null;
    }

    const computeTextAnchor = (angle: number): string | null => {
        return (angle > 90 && angle < 270) ? "end" : null;
    }

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
                        x1={Math.cos(asRadians(minorTheta)) * targetRMax}
                        y1={Math.sin(asRadians(minorTheta)) * targetRMax}
                        x2={Math.cos(asRadians(minorTheta)) * (targetRMax + 2)}
                        y2={Math.sin(asRadians(minorTheta)) * (targetRMax + 2)}
                        stroke="#ccc"
                    />
                {/each}
                {#each majorRefAngles as theta (theta)}
                    <line
                        x1=0
                        y1=0
                        x2={Math.cos(asRadians(theta)) * targetRMax}
                        y2={Math.sin(asRadians(theta)) * targetRMax}
                        stroke="#ccc"
                    />
                    <g
                        transform={`rotate(${theta}) translate(${targetRMax}, 0)`}
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