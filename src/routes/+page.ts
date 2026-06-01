import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const payload = {
        "angles": [
            15., 30., 45., 60., 75., 90.,
            105., 120., 135., 150., 165., 180.,
            195., 210., 225., 240., 255., 270.,
            285., 300., 315., 330., 345., 0.
        ],
        "lamina_payloads": [ 
            {
                "e1"          : 138.,
                "e2"          : 9.,
                "g12"         : 6.9,
                "v12"         : 0.3,
                "orientation" : 0.78539816339,
                "thickness"   : 0.25,
            },
            {
                "e1"          : 138.,
                "e2"          : 9.,
                "g12"         : 6.9,
                "v12"         : 0.3,
                "orientation" : -0.78539816339,
                "thickness"   : 0.25,
            }
        ]
    };

	const res = await fetch(`http://localhost:3000/`, {
        "headers": {
            'Content-Type': 'application/json'
        },
        "method": "POST",
        "body": JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(data);

	return { ...data };
};