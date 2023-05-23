import s from "./About.module.css"
import myImage from "./myImage.jpg"; // Asumiendo que tienes una imagen llamada myImage.jpg en la misma carpeta que este archivo
import github from "./github.png";
import linkedin from "./linkedin.png";
import Nav from "../Nav/Nav"

const About = () => {

    return (
        <div className={s.div}>
            <Nav />
            <div className={s.container}>
                <img className={s.img} src={myImage} alt="Mi imagen personal" />
                <h2 className={s.title}>Welcome to my gaming app!</h2>
                <div className={s.divRedes}>
                    <p className={s.text} >
                        Welcome to my gaming app! I am a passionate student of full stack web development. I am pleased to introduce you to this platform that aims to provide detailed information on a wide variety of video games.

                        With dedication and enthusiasm, I have developed this application using technologies like Javascript, React, Redux, Node.js, Express, PostgreSQL, Sequelize, and pure CSS. Each line of code has been carefully written to provide an unmatched user experience.
                    </p>
                    <p className={s.text}>
                        The application has an intuitive and friendly interface that allows you to explore, discover and learn about different video games. Thanks to the pagination functionality, you will be able to immerse yourself in a vast catalog of games comfortably and easily.

                        In addition, the application is equipped with powerful search, filter and sort tools, which will allow you to find the games that best suit your preferences and tastes. You can also use it to create your own video games and share them with the community.
                    </p>
                    <p className={s.text}>
                        But that is not all. In this app, we value the participation of our user community. Therefore, we give you the opportunity to upload new games to the platform. If you know an exciting game and want to share it with others, you can upload it to our app and allow other players to discover and enjoy it.
                    </p>
                    <br></br>
                    <p className={s.text}>Welcome aboard and have an exceptional experience in our gaming app!

                        Cordially,
                        Alejandro Vargas</p>
                    <section className={s.link}>
                        <a className={s.link} href="https://www.linkedin.com/in/alejandro-vargas-b81445267/" target="_blank">
                            <img className={s.imagenL} src={linkedin} alt="img not found" />
                        </a>
                    </section>

                    <section className={s.link}>
                        <a className={s.link} href="https://github.com/dether" target="_blank">
                            <img className={s.imagenL} src={github} alt="img not found" />
                        </a>
                    </section>
                </div>

            </div>
        </div>
    )
}

export default About;