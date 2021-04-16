import React from 'react'

//functional component

/*
WHEN TO USE:
1. For smaller components
2. reusable components
3. presentational components, patialy right, we can use HOOKS and specify states
*/

// const About = () => {
//     const message = `Hello World!`
//     return (
//         <h1> Hello About Page - {message}</h1>
//     )
// }

// const About = () => {
//     const message = 'Hello About World'
//     return React.createElement('h1', null, `${message} - CreateElement Div`)
// }

/*


*/

class About extends React.Component {

    render() {
        return (
            <div>
                <h1>Hello I am Class Component from About Page</h1>
            </div>
        )
    }
}

export default About