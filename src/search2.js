// import React from 'react';
// import axios from "./axios";
// // //import {Link} from "react-router-dom";
// //
// //
// // export default class Search2 extends React.Component {
// export default class Search2 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     //componentDidMount() {
//         handleSubmit()
//         //searh()
//         const isbn = "";
//
//         axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&callback=mycallback`).then(
//                 (result) => {
//                     this.setState({
//                         isLoaded: true,
//                         items: result.items
//                     });
//                 },
//
//
//     }
//
//     render() {
//             return (
//                 <div>
//               <form>
//                   <input onChange= {this.handleChange} name="search" type="text" placeholder="search" />
//                   {this.books}
//                   <button className="searchbutton">Search Books</button>
//               </form>
//               </div>
//                 <ul>
//                     {items.map(item => (
//                         <li key={item.name}>
//                             {item.name}
//                         </li>
//                     ))}
//                 </ul>
//             );
//         }
//     }
// }
