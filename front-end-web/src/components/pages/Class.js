import React from 'react';
import "./Class.css"

function ClassHome(props) {
    console.log(props.classname);
    return (
        <>
            <div id="container">
                <div id="video">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Y-cn6v6VGj4" title="video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <h2>CSE154: Web Programming</h2>
                    <p>this class is about web programming</p>
                </div>
                <div className="chatBox">
                    <h1>Notes: </h1>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1ROFLi4i2j33O4HHeEo1ZD7yQdEWW1kqlWhaO2EXEuws/edit?usp=sharing">Map</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/14fwDWwPrLibN_hicfGpuAKY2t5hrnTreoTaxGyZ4gi0/edit?usp=sharing">List</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1ClahM1wbNBJ7T35Cpt5dypyKDM9e_mtc-T_2LDJhu6E/edit?usp=sharing">Stack</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                    <p><a target="_blank" href="https://docs.google.com/document/d/1pn5Q5p_bayvgUeKan1iC2cAPO3McFA0SaPaS0_xX0Ck/edit?usp=sharing">Object Oriented Programming</a></p>
                </div>
            </div>
            <div className="all-lectures">
                <div className="lecture">
                    <h3>Lecture1:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture2:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture3:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture4:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture5:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture6:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture7:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture8:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture9:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture10:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture11:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture12:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture13:</h3>
                </div>
                <div className="lecture">
                    <h3>Lecture14:</h3>
                </div>
            </div>
        </>
    );
}

export default ClassHome;
