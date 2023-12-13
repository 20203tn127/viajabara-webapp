// CardViajesRegisterEdit.jsx
import React, { useState, useEffect } from "react";
import { Card, Select, DatePicker,TimePicker, Col, Row, Input } from "antd";
import { ConfigProvider } from "antd";
import { Field, ErrorMessage } from "formik";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
  FileTextOutlined,
  FieldTimeOutlined
} from "@ant-design/icons";
import "../../screens/Viajes/Viajes.css";
import { getAllConductores } from "../../service/conductores/serviceConductores";
import { getAllVehiculos } from "../../service/unidades/serviceUnidades";
import es from 'antd/locale/es_ES'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')


const { Meta } = Card;



const CardViajesRegisterEdit = ({nuevoViajeData,setNuevoViajeData, selectedRowKeys, isNew, viajeData, selectedConductor, setSelectedConductor, selectedUnidad, setSelectedUnidad, fecha, setFecha,
  setNombreViaje, nombreViaje
  , onChangedConductor, setOnChangedConductor,
  onChangedUnidad, setOnChangedUnidad,
  onChangedDate, setOnChangedDate,
  onChangedViajeName, setOnChangedViajeName,
  onChangedTimeViaje,setOnChangedTimeViaje,
  setHoraViaje,horaViaje


}) => {
  const [conductores, setConductores] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const format = 'HH:mm';

  useEffect(() => {
    // Cargar datos de conductores y unidades al montar el componente
    const fetchConductores = async () => {
      try {
        const res = await getAllConductores();
        setConductores(res.data.object || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUnidades = async () => {
      try {
        const res = await getAllVehiculos();
        setUnidades(res.data.object || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConductores();
    fetchUnidades();
  }, []);

  console.log(nuevoViajeData)
  


  return (
    <>
          <Col xs={0} sm={10} md={10} lg={10} xl={10}>
            <Card className="cardsita" title="Información general del viaje" style={{ height: "100%" }}>
              <Row style={{ marginBottom: "20px", justifyContent: "" }}>
                <EnvironmentOutlined style={{ fontSize: "24px", color: "#FB1506", marginRight: "10px" }} />
                <Meta
                  title={<span style={{ color: "black" }}>Punto de Origen <span style={{ color: "red" }}>*</span></span>}
                  description={viajeData ? viajeData.ruta.paradas[0].nombre : "Sin asignar"}
                  style={{ marginRight: "25px" }}
                />


                <EnvironmentOutlined style={{ fontSize: "24px", color: "#FB1506", marginRight: "10px" }} />
                <Meta
                  title={
                    <span>
                      Punto de Destino{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  description={viajeData ? viajeData.ruta.paradas.slice(-1)[0].nombre : "Sin asignar"}
                />

              </Row>
              <Row style={{ marginBottom: "18px" }}>
                <FileTextOutlined style={{ fontSize: "24px", color: "#FB1506", marginBottom: "10px" }} />

                <Meta
                  title={
                    <span style={{ marginLeft: "10px" }}>
                      Nombre del viaje{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                />

                <Field
                  type="text"
                  name="nombreViaje"
                  as={Input}
                  placeholder="Sin asignar"
                  style={{ marginTop: "5px", marginLeft: "8px" }}
                  value={viajeData && !onChangedViajeName ? viajeData.nombre : nombreViaje}
                  onChange={(event) => {
                    setOnChangedViajeName(true);
                    setNombreViaje(event.target.value); // Usar event.target.value para obtener el valor del campo
                  }}
                />
              </Row>

              <Row style={{ marginBottom: "18px" }}>
                <FieldTimeOutlined style={{ fontSize: "24px", color: "#FB1506", marginBottom: "10px" }} />
                <Meta
                  title={
                    <span style={{ marginLeft: "10px" }}>
                      Hora del viaje{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                />

                <Field
                  type="text"
                  name="horaViaje"
                  as={Input}
                  placeholder="Sin asignar"
                  style={{ marginTop: "5px", marginLeft: "8px" }}
                  value={viajeData && !onChangedTimeViaje ? viajeData.hora : horaViaje}
                  onChange={(event) => {
                    setOnChangedTimeViaje(true);
                    setHoraViaje(event.target.value); // Usar event.target.value para obtener el valor del campo
                  }}
                />
              </Row>

              <Row style={{marginTop:"20px"}}>
                <CalendarOutlined style={{ fontSize: "24px", color: "#FB1506", marginBottom: "10px" }} />
                <Meta
                title={
                  <span style={{ marginLeft: "10px" }}>
                    Fecha de Viaje{" "}
                    <span style={{ color: "red" }}>*</span>
                  </span>
                }
              />

                <ConfigProvider locale={es}>
                  <DatePicker style={{ width: "100%" }} value={viajeData && viajeData.fechaViaje && !onChangedDate ? dayjs(viajeData.fechaViaje, "YYYY-MM-DD") : undefined} 
                  onChange={(value) => {
                    setOnChangedDate(true)
                    setFecha(value)
                  }} />
                </ConfigProvider>
              </Row>

            </Card>
          </Col>
      
          <Col xs={0} sm={14} md={14} lg={14} xl={14}>
            <Card className="cardsita" title="Información general del transporte" style={{ height: "100%" }}>
              <Row style={{ marginBottom: "18px", marginTop: "25px" }}>

                <Col style={{ marginRight: "110px", marginLeft: "30px" }}>
                  <Row>
                    <UserOutlined style={{ fontSize: "24px", color: "#FB1506", marginRight: "10px" }} />
                    <Meta
                      title={
                        <span style={{ marginRight: "25px" }}>
                          Conductor asignado{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                    />

                  </Row>

                  <Field
                    as={Select}
                    name="conductor"
                    style={{ width: 200, marginTop: "5px", marginLeft: "35px" }}
                    
                    value={viajeData  && !onChangedConductor ? viajeData.conductor.usuario.nombre : selectedConductor} 
                    onChange={(value) =>{ 
                      setOnChangedConductor(true)
                      setSelectedConductor(value)
                    }}
                  >
                    <option value={0} >Sin asignar</option>
                    {conductores.map((conductor) => (
                      <option key={conductor.idConductor} value={conductor.idConductor}>
                        {conductor.usuario.nombre}
                      </option>
                    ))}
                  </Field>

                  
                </Col>
                
                <Col>
                  <Row>
                    <CarOutlined style={{ fontSize: "24px", color: "#FB1506", marginRight: "10px" }} />
                    <Meta
                      title={
                        <span style={{ marginRight: "25px" }}>
                          Unidad asignada{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                    />

                  </Row>
                  <Field
                    as={Select}
                    name="unidad"
                    value={viajeData  && !onChangedUnidad ? `${viajeData.vehiculo.marca} ${viajeData.vehiculo.modelo} ${viajeData.vehiculo.alias}` : selectedUnidad} 
                    style={{ width: 200, marginTop: "5px", marginLeft: "35px" }}
                    onChange={(value) =>{ 
                      setOnChangedUnidad(true)
                      setSelectedUnidad(value)
                    }}
                  > 
                    <option value={0}>Sin asignar</option>
                    {unidades.map((unidad) => (
                      <option key={unidad.idVehiculo} value={unidad.idVehiculo.toString()}>
                        {`${unidad.marca} ${unidad.modelo} (${unidad.alias})`}
                      </option>
                    ))}
                  </Field>
                </Col>
              </Row>
            </Card>
          </Col>

    </>
  );
  
};

export default CardViajesRegisterEdit;
