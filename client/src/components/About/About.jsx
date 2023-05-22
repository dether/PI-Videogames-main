import styles from "./About.module.css"
import myImage from './myImage.jpg'; // Asumiendo que tienes una imagen llamada myImage.jpg en la misma carpeta que este archivo

//! target="_blank" abre una pestaña nueva en el navegador
//! href="url_que_le_pasemos" en esa pestaña nueva nos redirecciona a la url que le pasemos

const About = () => {
    
    return (
        <div className={styles.container}>
            
                <img className={styles.img} src={myImage} alt="Mi imagen personal" />
                <h1 className={styles.title}>Alejandro Vargas</h1>
                <p className={styles.parrafo} >Hola, soy un estudiante de soyHenry y este es mi primer proyecto </p>
                    <section className={styles.section}>
                        <a className={styles.link} href="https://www.linkedin.com/in/alejandro-vargas-b81445267/" target="_blank">Facebook</a> 
                    </section>
                    <section className={styles.section}>
                        <a className={styles.link} href="https://www.linkedin.com/in/alejandro-vargas-b81445267/" target="_blank">Gmail</a>
                    </section>
                    <section className={styles.section}>
                        <a className={styles.link} href="https://www.linkedin.com/in/alejandro-vargas-b81445267/" target="_blank"> Linkedin </a> 
                    </section>
        </div>
    )
}

export default About;