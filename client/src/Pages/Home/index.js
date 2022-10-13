import * as React from 'react';
import Nav from '../../components/Nav';
export function Home() {
    return (
        <div>
            {/*this is the page design was worked on by JP Maldonao*/}
            <section className='container' >
                <h1 id='title1'> Resumator</h1>
                <ul id='nav1'>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                </ul>
            </section>

            <section className='hero'>
                <div className='hero-form'>
                    <h2>Struggling to Design your Resume?</h2>
                    <p>
                        We have some templates for you!
                    </p>
                    <button type="submit">
                        View Templates
                    </button>
                    <button>
                        <a href="/signup">Signup</a>
                    </button>
                </div>
            </section>

            <div>
                <h4 className='templateheader' >Check out our Templates!</h4>
            </div>

            <section className='templates'>

                <article className='template1'>
                </article>

                <article className='template2'>
                </article>

                <article className='template3'>
                </article>

            </section>



            <section className='templatenames'>

                <article className='tn1'>
                    <a href="">Template #1</a>
                    <h4>copy copy copy</h4>
                </article>

                <article className='tn2'>
                    <a href="">Template #2</a>
                    <h4>copy copy copy</h4>
                </article>

                <article className='tn3'>
                    <a href="">Template #3</a>
                    <h4>copy copy copy</h4>
                </article>

            </section>

            <footer>
                <br></br><hr></hr>
                <h5>Created by the Resumator Team.</h5>
                <div className='footlink'>
                    <a href="./privacy-policy.html">Read Our Privacy Policy</a><br />
                    &copy; 2022 Resumator.
                </div>
            </footer>

        </div>
    )
}