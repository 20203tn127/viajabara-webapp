import { Routes, Route, Navigate } from 'react-router-dom';
import Conductores from './screens/Conductores/Conductores';
import Unidades from './screens/Unidades/Unidades';
import Login from './screens/Login/Login';
import Viajes from './screens/Viajes/Viajes';
import ViajesRegisterAndEdit from './screens/Viajes/Subscreens/ViajesRegisterAndEdit';
import ParadasRegisterAndEdit from './screens/Viajes/Subscreens/ParadasRegisterAndEdit';
import UnidadesRegister from './screens/Unidades/Subscreens/UnidadesRegister';
import UnidadesEdit from './screens/Unidades/Subscreens/UnidadesEdit';
import ConductoresRegister from './screens/Conductores/Subscreens/ConductoresRegister';
import ConductoresEditCard from './components/Cards/ConductoresEditCard';
import ConductoresEdit from './screens/Conductores/Subscreens/ConductoresEdit';

function App() {
  return (
    <Routes>
      <Route path="/logout" element={<Login />} />
      <Route path="/" element={<Navigate to="/logout" />} />
      <Route path="/viajes" element={<Viajes />} />
      <Route path="/viajesRegister" element={<ViajesRegisterAndEdit isNew={true} />} />
      <Route path="/viajesRegister/:idViaje" element={<ViajesRegisterAndEdit isNew={false} />} />
      <Route path="/paradasRegister" element={<ParadasRegisterAndEdit />} />
      <Route path='/unidadesRegister' element={<UnidadesRegister/>}></Route>
      <Route path="/conductores" element={<Conductores />} />
      <Route path='/conductoresRegister' element={<ConductoresRegister />}></Route>
      <Route path='/conductoresEdit' element={<ConductoresEdit />}></Route>
      <Route path="/unidades" element={<Unidades />} />
      <Route path='/unidadesEdit' element={<UnidadesEdit />} />
    </Routes>
  );
}

export default App;
