import axios from 'axios'

export default async (req, res) => {

    if (req.method === 'POST') {
        const postData = JSON.parse(req.body)
        console.log(postData)

        return res.json({
            status: 'Saving to DB.... (fake too)',
            ...postData
        })
    }
    else { //GET
        const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')

        return res.json(posts.data.slice(0, 10))
    }


}

