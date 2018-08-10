import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <h1 className="title">About This Project</h1>
        <div className="about-text">
          This was a fun little project that allowed me to work with some tools that I have not used in a while. I had
          some fun challenges when I realized how quickly my back end code was going to be really inneficient in
          delivering a team that fit the parameters quickly. I took a little break and got a drink. After my break it
          hit me and I went from a roughly 5 second team generation to less than 5 milliseconds, needless to say I was
          pleased. I enjoyed this project and definitely have more things I would implement in it. I wanted to have
          teams stored in a database, and mock contests between them. I wanted an opportunity to remove and regenerate
          an individual player. Still had some other plans to expand the server as well. I did enjoy this project, and
          look forward to revisiting it in free time to improve certain portions I am unhappy with.
        </div>
      </div>
    );
  }
}
