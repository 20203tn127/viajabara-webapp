import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Table.css";
import { deleteViajeById, getAllViajes, getViajeById } from "../../service/Viajes/serviceViajes";
import Swal from "sweetalert2";
import { deleteRutaById } from "../../service/Rutas/serviceRutas";

const CustomTable = ({viajesData, setViajesData}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate ();

  useEffect(() => {
    const fetchAllViajes = async () => {
      try {
        const res = await getAllViajes();
        console.log(res.data);
        setViajesData(Array.isArray(res.data.object) ? res.data.object : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllViajes();
  }, []);

  const handleEditClick = (idViaje) => {
    navigate(`/viajesRegister/${idViaje}`);
  };


  
  const handleOnDeleted = async (idViaje) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de eliminar el viaje?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3B4276",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });
  
      if (!result.isConfirmed) return;
  
      const idRush = (await getViajeById(idViaje)).data.object.ruta.idRuta;
  
      const deleteViajeRes = await deleteViajeById(idViaje);
  
      if (deleteViajeRes.status === 200 && deleteViajeRes.data.message === "Eliminado correctamente") {
        const deleteRutaRes = await deleteRutaById(idRush);
  
        if (deleteRutaRes.status === 200) {
          await Swal.fire({
            title: "Eliminado",
            text: "El viaje ha sido eliminado exitosamente.",
            icon: "success",
            showConfirmButton: true,
          });
  
          window.location.href = "/viajes";
        } else {
          console.error("Error al intentar eliminar la ruta:", deleteRutaRes);
          throw new Error("Error al intentar eliminar la ruta");
        }
      } else {
        console.error("Error al intentar eliminar el viaje:", deleteViajeRes);
        throw new Error("Error al intentar eliminar el viaje");
      }
    } catch (error) {
      console.error("Error general:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al intentar eliminar el viaje. Por favor, inténtalo de nuevo.",
        icon: "error",
      }).then(() => {
        window.location.href = "/viajes";
      });
    }
  };
  



  const mappedData = viajesData.map((viaje) => ({
    key: viaje.idViaje.toString(),
    nombre: viaje.nombre,
    conductor: viaje.conductor.usuario.nombre,
    origen: viaje.ruta.paradas[0].nombre,
    destino: viaje.ruta.paradas[viaje.ruta.paradas.length - 1].nombre,
    hora: viaje.hora,
    puntosIntermedios: viaje.ruta.paradas.length,
    tipoUnidad: viaje.vehiculo.tipo,
    acciones: (
      <Space size="middle">
        <Button icon={<EyeOutlined />} />
        <Button icon={<EditOutlined />} onClick={() => handleEditClick(viaje.idViaje)} />
        <Button icon={<DeleteOutlined />} onClick={()=>{handleOnDeleted(viaje.idViaje)}}/>
      </Space>
    ),
  }));

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Conductor",
      dataIndex: "conductor",
      sorter: (a, b) => a.conductor.localeCompare(b.conductor),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Origen",
      dataIndex: "origen",
      sorter: (a, b) => a.origen.localeCompare(b.origen),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Destino",
      dataIndex: "destino",
      sorter: (a, b) => a.destino.localeCompare(b.destino),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Hora de inicio",
      dataIndex: "hora",
      sorter: (a, b) => a.hora.localeCompare(b.hora),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Puntos Intermedios",
      dataIndex: "puntosIntermedios",
      sorter: (a, b) => a.puntosIntermedios - b.puntosIntermedios,
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Tipo de Unidad",
      dataIndex: "tipoUnidad",
      sorter: (a, b) => a.tipoUnidad.localeCompare(b.tipoUnidad),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      responsive: ["xs", "sm", "md"],
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const noDataMessage = "No hay viajes disponibles";

  return (
    <div style={{ overflowX: "auto" }}>
      <Link to="/viajesRegister">
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontWeight: "bold" }} />}
          style={{
            marginBottom: "16px",
            fontFamily: "CircularSTD",
            background: "#3B4d", //3B4d
            
          }}
        >
          Añadir viaje
        </Button>
      </Link>

      <Table
        className="tbl-font"
        columns={columns}
        dataSource={mappedData}
        loading={loading}
        onChange={onChange}
        pagination={{ responsive: true, pageSize: 4 }}
        locale={{
          emptyText: <div style={{ textAlign: "center" }}>{noDataMessage}</div>,
        }}
      />
    </div>
  );
};

export default CustomTable;
