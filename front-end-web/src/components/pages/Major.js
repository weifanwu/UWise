import React from 'react';
import "./Major.css"

export default function Major() {
  return <>
            <div id="background">
                <img src="/images/test.jpg"/>
            </div>
            <div id="all">
                <h1>UW专业</h1>
                <div id="majors">
                    <div id="science">
                        <h2>Sciences:</h2>
                        <h3>Natural Science:</h3>
                        <p className="major"><a href="https://chem.washington.edu/undergraduate-admissions" target="_blank">CHEM & BIOCHEM</a></p>
                        <p className="major"><a href="https://www.biology.washington.edu/programs/undergraduate/admissions" target="_blank">BIO</a></p>
                        <p className="major"><a href="https://phys.washington.edu/admissions" target="_blank">PHYS</a></p>
                        <h3>Social Science:</h3>
                        <p className="major"><a href="https://econ.washington.edu/apply-economics-major" target="_blank">ECON</a></p>
                        <p className="major"><a href="https://psych.uw.edu/undergraduate/prospective-students/admissions" target="_blank">PSYCH</a></p>
                        <p className="major"><a href="https://soc.washington.edu/applying-sociology-major" target="_blank">SOCIO</a></p>
                        <p className="major"><a href="https://www.polisci.washington.edu/political-science-major#Applying" target="_blank">POLIT SCI</a></p>
                        <h3>Other “Science"":</h3>
                        <p className="major"><a href="https://acms.washington.edu/admissions" target="_blank">ACMS</a></p>
                        <p className="major"><a href="https://ischool.uw.edu/programs/informatics/admissions/current-students" target="_blank">INFORMATICS</a></p>
                        <p className="major"><a href="https://amath.washington.edu/undergraduate-admissions" target="_blank">AMATH</a></p>
                        <p className="major"><a href="https://math.washington.edu/undergraduate-admissions" target="_blank">MATH</a></p>
                        <p className="major"><a href="https://stat.uw.edu/academics/undergraduate/application" target="_blank">STAT</a></p>
                        <p className="major"><a href="https://www.cs.washington.edu/academics/ugrad/admissions/currentuw" target="_blank">COMPUTER SCIENCE & ENGINEERING</a></p>
                        <p className="major"><a href="https://geography.washington.edu/declare-geography-major" target="_blank">GEOG</a></p>
                        <p className="major"><a href="https://www.hcde.washington.edu/bs/admissions" target="_blank">HCDE</a></p>
                    </div>
                    <div id="art">
                        <h2>Arts:</h2>
                        <p className="major"><a href="https://com.uw.edu/admissions/undergraduate-admissions/apply-communication-or-jpic-major/" target="_blank">COM</a></p>
                        <p className="major"><a href="https://phil.washington.edu/philosophy-majors" target="_blank">PHIL</a></p>
                        <p className="major"><a href="https://history.washington.edu/major" target="_blank">HISTORY</a></p>
                        <h2>Business:</h2>
                        <p className="major"><a href="https://foster.uw.edu/academics/degree-programs/undergraduate-programs/admissions/standard-admission/" target="_blank">FOSTER</a></p>
                    </div>
                </div>
            </div>
         </>
}



