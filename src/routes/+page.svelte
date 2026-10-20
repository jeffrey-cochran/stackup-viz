<script lang='ts'>
    import {FlowerGraph} from '$lib';
	import { asRadians } from '$lib/flowerGraph/utils';

    const width = 300;
    const height = 300;
    const numRadialTicks = 10;
    const numAngularTicks = 8;
    const isDegrees = true;
    let r: number[] = $state([100, 100, 100, 100, 100, 100, 100, 100]);
    let theta: number[] = $state([ 0, Math.PI / 4., Math.PI / 2., 3. * Math.PI / 4., Math.PI, 5 * Math.PI / 4., 3. * Math.PI / 2., 7. * Math.PI / 4.]);

    const getPly = (plyAngle: number) => {
        return {
                "e1"          : 138.,
                "e2"          : 9.,
                "g12"         : 6.9,
                "v12"         : 0.3,
                "orientation" : asRadians(plyAngle),
                "thickness"   : 0.25,
        }
    }

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const value = formData.get("plyangles") as string;
        const angles = Array.from({length: 360}, (_, i) => i);
        const lamina_payloads = value.split(",").map(d => getPly(Number(d)));
        const payload = { angles, lamina_payloads }

        const res = await fetch(`http://localhost:3000/`, {
            "headers": {
                'Content-Type': 'application/json'
            },
            "method": "POST",
            "body": JSON.stringify(payload)
        });

        const data = await res.json();
        try {
            r = data.bending_stiffness;
            theta = data.angles;
        } catch (e) {
            console.error(e);
        }
    };

</script>

<div id="container">

    <FlowerGraph {width} {height} {numAngularTicks} {numRadialTicks} {isDegrees} {r} {theta} />
    <form onsubmit={onSubmit} class="form-example">
        <div class="form-example">
            <label for="name">Comma-separated ply angles: </label>
            <input type="text" name="plyangles" id="plyangles" required />
        </div>
        <div class="form-example">
            <input type="submit" value="Submit" />
        </div>
    </form>
</div>
