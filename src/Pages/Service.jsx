import { Navbar } from "../components/Navbar";
import { useAuth } from "../store/auth";
import "../style/service.css";

export const Service = () => {
  const { services } = useAuth();
  
  console.log(services,"this is services")
  return (
    <>
      <Navbar />

      <section className="section-service">
        <h1 className="main-heading">Services</h1>

        {services && services?.length > 0 ? (
          <div className="flex-cards">
            {services.map((curElem, index) => {
              const { price, description, provider, service, courseImg } = curElem;

              return (
                <div className="card" key={index}>
                  <div className="card-img">
                    <img src={courseImg} alt="our services info" />
                  </div>
                  <div className="card-detailed">
                    <div className="grid-two-cols">
                      <p>{provider}</p>
                      <p className="price-text">Price: {price}</p>
                    </div>
                    <h2 className="serviceName">{service}</h2>
                    <p>{description}</p>
                  </div>

                </div>

                
              );
            })}
          </div>
        ) : (
          <p className="no-data">No services available at the moment.</p>
        )}
      </section>
    </>
  );
};
