import { Shell } from '../components/Shell.jsx';
import { useMemo, useState, useEffect } from 'react';
import { useSession } from '../context/SessionContext.jsx';

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true, focusable: false };

  switch (name) {
    case 'users': return <svg {...common}><path d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 20v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'courses': return <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'message': return <svg {...common}><path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'settings': return <svg {...common}><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M19.4 15a7.9 7.9 0 0 0 .1-2l2-1.5-2-3.5-2.4 1a8 8 0 0 0-1.7-1L15 3h-6L8.6 7.5a8 8 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7.9 7.9 0 0 0 .1 2l-2 1.5 2 3.5 2.4-1a8 8 0 0 0 1.7 1L9 21h6l.4-2.5a8 8 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'faq': return <svg {...common}><path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.09 9a3 3 0 1 1 4.91 2.36c-.9.63-1.5 1.28-1.5 2.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'filter': return <svg {...common}><path d="M3 4h18l-7 8v6l-4 2v-8L3 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'search': return <svg {...common}><path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'edit': return <svg {...common}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'trash': return <svg {...common}><path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    default: return null;
  }
}

export function Admin() {
  const { user, status } = useSession();
  const [query, setQuery] = useState('');
  const [activeSection, setActiveSection] = useState('usuarios');
  
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Estados para la pestaña de Cursos
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState('');
  const [modulos, setModulos] = useState([]);
  const [loadingModulos, setLoadingModulos] = useState(false);

  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');
  const [editingModuleId, setEditingModuleId] = useState(null); 
  const [moduleToDelete, setModuleToDelete] = useState(null); 
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Estado para las notificaciones
  const [toastMessage, setToastMessage] = useState(null);

  // Función para mostrar la notificación tipo Toast
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 2000); // Desaparece después de 2 segundos
  };

  // 1. Cargar los cursos disponibles
  const fetchCursos = async () => {
    try {
      const response = await fetch('/api/cursos');
      const data = await response.json();
      
      if (data.success && data.cursos.length > 0) {
        setCursos(data.cursos);
        // Seleccionamos el primer curso por defecto y cargamos sus módulos
        const primerCursoId = data.cursos[0].id;
        setSelectedCurso(primerCursoId);
        fetchModulos(primerCursoId);
      }
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  // 2. Cargar los módulos de un curso específico
  const fetchModulos = async (cursoId) => {
    setLoadingModulos(true);
    try {
      const response = await fetch(`/api/cursos/${cursoId}/modulos`);
      const data = await response.json();
      if (data.success) {
        setModulos(data.modulos);
      }
    } catch (error) {
      console.error("Error al cargar módulos:", error);
    } finally {
      setLoadingModulos(false);
    }
  };

  const openNewModuleModal = () => {
    setEditingModuleId(null);
    setNewModuleTitle('');
    setNewModuleDesc('');
    setIsModuleModalOpen(true);
  };

  const openEditModuleModal = (mod) => {
    setEditingModuleId(mod.id);
    setNewModuleTitle(mod.titulo);
    setNewModuleDesc(mod.descripcion || '');
    setIsModuleModalOpen(true);
  };

  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return showToast("El título es obligatorio", "error");

    const isEditing = editingModuleId !== null;
    const url = isEditing 
        ? `/api/modulos/${editingModuleId}` 
        : `/api/cursos/${selectedCurso}/modulos`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: newModuleTitle, descripcion: newModuleDesc })
      });
      
      const data = await response.json();
      if (data.success) {
        if (isEditing) {
          setModulos(modulos.map(m => m.id === editingModuleId ? { ...m, titulo: newModuleTitle, descripcion: newModuleDesc } : m));
          showToast("¡Módulo actualizado exitosamente!");
        } else {
          setModulos([...modulos, data.modulo]);
          showToast("¡Módulo creado exitosamente!");
        }
        setIsModuleModalOpen(false);
      } else {
        showToast("Error: " + data.message, "error");
      }
    } catch (error) {
      showToast("Error de conexión al guardar el módulo.", "error");
    }
  };

  const confirmDeleteModule = (mod) => {
    setModuleToDelete(mod);
    setIsConfirmModalOpen(true);
  };

  const executeDeleteModule = async () => {
    if (!moduleToDelete) return;

    try {
      const response = await fetch(`/api/modulos/${moduleToDelete.id}`, { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        setModulos(modulos.filter(m => m.id !== moduleToDelete.id)); 
        showToast("Módulo eliminado correctamente");
      } else {
        showToast("Error: " + data.message, "error");
      }
    } catch (error) {
      showToast("Error de conexión al eliminar.", "error");
    } finally {
      // Siempre cerramos el modal y limpiamos, pase lo que pase
      setIsConfirmModalOpen(false);
      setModuleToDelete(null);
    }
  };

  // 3. Efecto para que cargue los cursos solo cuando entramos a la pestaña "cursos"
  useEffect(() => {
    if (activeSection === 'cursos') {
      fetchCursos();
    }
  }, [activeSection]);

  // 4. Manejar el cambio del selector
  const handleCursoChange = (e) => {
    const nuevoCursoId = e.target.value;
    if (nuevoCursoId === 'nuevo') {
      alert("Aquí abriremos un modal para crear un curso nuevo pronto!");
      return;
    }
    setSelectedCurso(nuevoCursoId);
    fetchModulos(nuevoCursoId);
  };

  useEffect(() => {
    if ((user?.rol === 'Administrador' || user?.rol === 'Super Administrador') && activeSection === 'usuarios') {
      setLoadingUsers(true);
      fetch('/api/admin/usuarios')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUsers(data.users);
          }
        })
        .catch(err => console.error("Error cargando usuarios:", err))
        .finally(() => setLoadingUsers(false));
    }
  }, [user?.rol, activeSection]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const filteredUsers = useMemo(() => {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      return (u.name || '').toLowerCase().includes(q);
    });
  }, [query, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageTitle = useMemo(() => {
    switch (activeSection) {
      case 'usuarios': return 'Usuarios';
      case 'cursos': return 'Cursos edición';
      case 'configuracion': return 'Configuración';
      default: return 'Administración';
    }
  }, [activeSection]);

  function progressTone(progress) {
    if (progress >= 70) return 'good';
    if (progress >= 35) return 'mid';
    return 'low';
  }

  function formatDate(dateString) {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  const openEditModal = (u) => {
    setEditingUser(u);
    setNewRole(u.role);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setNewRole('');
  };

// Reemplaza handleSaveRole por esta:
  const handleSaveRole = async () => {
    try {
      const response = await fetch(`/api/admin/usuarios/${editingUser.id}/rol`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newRole })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Actualizamos la tabla local sin recargar la página
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, role: newRole } : u));
        closeEditModal();
      } else {
        alert(data.message || 'Error al cambiar el rol');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const handleDeleteUser = async (u) => {
    const confirmDelete = window.confirm(`¿Estás seguro que deseas eliminar permanentemente a ${u.name}? Esta acción no se puede deshacer.`);
    
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/admin/usuarios/${u.id}`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          setUsers(users.filter(user => user.id !== u.id));
        } else {
          alert(data.message || 'Error al eliminar usuario');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
      }
    }
  };

  if (status === 'loading') return null; 
  
  if (user?.rol !== 'Administrador' && user?.rol !== 'Super Administrador') {
    return (
      <Shell>
        <main className="hub" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h1 style={{ color: '#8a1a1a' }}>Acceso Denegado</h1>
          <p>No tienes los permisos necesarios para ver esta página.</p>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="hub hub-admin" aria-label="Administración">
        <style>{`
          /* REGLA DE ORO PARA EVITAR DESBORDES */
          .hub-admin *, .hub-admin *::before, .hub-admin *::after {
            box-sizing: border-box !important;
          }

          .hub.hub-admin { 
            max-width: 1180px; 
            margin: 40px auto; 
            padding: 32px; 
            background: #d1e3f7; 
            border-radius: 24px; 
            box-shadow: 0 8px 32px rgba(26, 78, 138, 0.12); 
            width: 100%;
          }
          
          /* LAYOUT GRID BLINDADO (No más solapamientos) */
          .hub-admin .admin-layout-grid { 
            display: grid !important; 
            grid-template-columns: 280px minmax(0, 1fr) !important; 
            gap: 24px !important; 
            align-items: start !important; 
            width: 100% !important; 
          }
          
          .hub-admin .admin-sidebar-col { 
            position: sticky !important; 
            top: 20px !important; 
            display: flex !important; 
            flex-direction: column !important; 
            gap: 16px !important; 
            z-index: 10 !important; 
          }
          
          .hub-admin .admin-main-col { 
            display: flex !important; 
            flex-direction: column !important; 
            gap: 16px !important; 
            min-width: 0 !important; /* Vital para que la tabla no rompa el grid */
          }
          
          .hub-admin .generic-card { width: 100%; background: #ffffff; border: 2px solid #c9def5; border-radius: 18px; padding: 22px 24px; box-shadow: 0 4px 16px rgba(60, 120, 200, 0.08); position: relative; overflow: hidden; }
          .hub-admin [aria-label="Encabezado"] { margin-bottom: 24px; z-index: 1; }
          
          .hub-admin .title { margin: 0 0 6px; color: #1a4e8a; font-weight: 900; font-size: 2.2rem; letter-spacing: 0.3px; text-align: left; }
          .hub-admin .subtitle { margin: 0; color: #405268; font-weight: 600; text-align: left; }

          .hub-admin .profile { display: grid; grid-template-columns: 64px 1fr; gap: 14px; align-items: center; }
          .hub-admin .avatar { width: 64px; height: 64px; border-radius: 999px; background: radial-gradient(circle at 30% 30%, #4f9aff 0%, #1a4e8a 100%); box-shadow: 0 6px 16px rgba(26, 78, 138, 0.25); border: 2px solid #ffffff; flex-shrink: 0;}
          .hub-admin .profile-name { margin: 0; color: #111; font-weight: 900; text-align: left; line-height: 1.1; font-size: 1.1rem; }
          .hub-admin .profile-role { margin: 4px 0 0; color: #1e7035; font-weight: 800; text-align: left; font-size: 0.9rem; }

          .hub-admin .nav { display: grid; gap: 10px; }
          .hub-admin .navbtn { width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 12px; padding: 12px 14px; border-radius: 12px; border: 1px solid transparent; background: transparent; color: #405268; font-weight: 800; cursor: pointer; text-align: left; transition: all 0.2s ease;}
          .hub-admin .navbtn:hover { background: #f0f7ff; color: #1a4e8a; }
          .hub-admin .navbtn.active { background: #1a4e8a; color: #ffffff; box-shadow: 0 4px 12px rgba(26, 78, 138, 0.3); }

          .hub-admin .toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; width: 100%;}
          .hub-admin .toolbar-left { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; width: 100%; }
          .hub-admin .iconbtn { width: 44px; height: 44px; border-radius: 12px; border: 2px solid #e3eaf2; background: #f7fbff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: #1a4e8a; flex-shrink: 0; transition: background 0.2s;}
          .hub-admin .iconbtn:hover { background: #eaf4ff; border-color: #c9def5;}
          
          /* BUSCADOR BLINDADO PARA EVITAR QUE EL ICONO MONTE AL TEXTO */
          .hub-admin .admin-search-box { 
            display: flex; 
            align-items: center; 
            gap: 10px; 
            border: 2px solid #e3eaf2; 
            background: #f7fbff; 
            border-radius: 12px; 
            padding: 0 14px; 
            height: 44px; 
            flex: 1 1 100%; 
            min-width: 200px;
            transition: border-color 0.2s;
          }
          .hub-admin .admin-search-box svg { flex-shrink: 0; width: 18px; height: 18px; }
          .hub-admin .admin-search-box:focus-within { border-color: #1a4e8a; background: #ffffff; }
          .hub-admin .admin-search-box input { border: none !important; outline: none !important; font-size: 1rem; width: 100%; background: transparent !important; color: #111111 !important; font-weight: 600;}
          .hub-admin .admin-search-box input::placeholder { color: #8a9ba8 !important; font-weight: 500;}

          .hub-admin .tablewrap { overflow-x: auto; border-radius: 16px; border: 2px solid #e3f0ff; background: #ffffff; width: 100%;}
          .hub-admin table { width: 100%; border-collapse: collapse; background: transparent; min-width: 700px; }
          .hub-admin thead th { text-align: left; padding: 16px 14px; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; color: #1a4e8a; background: #eaf4ff; border-bottom: 2px solid #d1e3f7; font-weight: 900;}
          .hub-admin tbody td { padding: 14px 14px; border-bottom: 1px solid #eef2f7; color: #222e3a; font-weight: 700; vertical-align: middle; }
          .hub-admin tbody tr:nth-child(even) td { background: #fafcff; }
          .hub-admin tbody tr:hover td { background: #f0f7ff; }
          
          .hub-admin .muted { font-weight: 800; color: #405268; opacity: 0.85; }
          .hub-admin .pill { display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 999px; background: #eaf4ff; color: #1a4e8a; font-weight: 800; font-size: 0.85rem; border: 1px solid #c9def5;}
          .hub-admin .pct { font-variant-numeric: tabular-nums; font-weight: 900; font-size: 1.05rem;}
          .hub-admin .pct.good { color: #1e7035; } 
          .hub-admin .pct.mid { color: #f59e0b; } 
          .hub-admin .pct.low { color: #b42318; } 
          
          .hub-admin .footerRow { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 12px 4px 0; }
          .hub-admin .mini { color: #1a4e8a; font-weight: 800; margin: 0; font-size: 0.95rem;}

          .hub-admin .pagination { display: flex; justify-content: flex-end; align-items: center; gap: 15px; padding-top: 20px; margin-top: 10px; border-top: 2px solid #eaf4ff;}
          .hub-admin .pagination button { background: #ffffff; border: 2px solid #c9def5; padding: 8px 16px; border-radius: 10px; font-weight: 800; color: #1a4e8a; cursor: pointer; transition: all 0.2s;}
          .hub-admin .pagination button:hover:not(:disabled) { background: #1a4e8a; color: #ffffff; border-color: #1a4e8a;}
          .hub-admin .pagination button:disabled { opacity: 0.5; cursor: not-allowed; color: #8a9ba8; border-color: #e3eaf2; background: #f7fbff;}
          .hub-admin .page-info { font-size: 0.95rem; font-weight: 800; color: #1a4e8a; }

          .hub-admin .action-btn { background: #f7fbff; border: 1px solid #e3eaf2; cursor: pointer; padding: 8px; border-radius: 8px; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center; }
          .hub-admin .action-btn svg { width: 18px; height: 18px; flex-shrink: 0;}
          .hub-admin .action-btn.edit { color: #1a4e8a; }
          .hub-admin .action-btn.edit:hover { background: #1a4e8a; color: #ffffff; border-color: #1a4e8a;}
          .hub-admin .action-btn.delete { color: #b42318; }
          .hub-admin .action-btn.delete:hover { background: #b42318; color: #ffffff; border-color: #b42318;}

          .hub-admin .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
          .hub-admin .modal-box { background: #ffffff; width: 420px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.25); padding: 30px; animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); border: 2px solid #eaf4ff;}
          @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .hub-admin .modal-header { font-size: 1.6rem; color: #1a4e8a; font-weight: 900; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #eaf4ff; padding-bottom: 12px; }
          .hub-admin .modal-label { display: block; font-size: 0.95rem; color: #1a4e8a; font-weight: 800; margin-bottom: 8px; }
          .hub-admin .modal-select { width: 100%; padding: 12px; border-radius: 10px; border: 2px solid #c9def5; outline: none; font-size: 1rem; font-weight: 700; color: #111; margin-bottom: 24px; background-color: #f7fbff; transition: border-color 0.2s;}
          .hub-admin .modal-select:focus { border-color: #1a4e8a; }
          .hub-admin .modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
          .hub-admin .btn-modal { padding: 10px 20px; border-radius: 10px; font-weight: 800; cursor: pointer; border: none; transition: transform 0.1s, opacity 0.2s; }
          .hub-admin .btn-modal.cancel { background: #eef2f7; color: #405268; }
          .hub-admin .btn-modal.save { background: #1e7035; color: #fff; box-shadow: 0 4px 12px rgba(30, 112, 53, 0.25);} 
          .hub-admin .btn-modal:hover { opacity: 0.9; transform: translateY(-1px);}

          @media (max-width: 980px) { 
            .hub.hub-admin { padding: 20px; margin: 20px; border-radius: 16px;} 
            .hub-admin .admin-layout-grid { grid-template-columns: 1fr !important; } 
            .hub-admin .admin-sidebar-col { position: relative !important; top: 0 !important; } 
          }
        `}</style>

        {editingUser && (
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-header">Editar Perfil</h2>
              <div style={{ marginBottom: '20px', padding: '12px', background: '#f8fbff', borderRadius: '12px', border: '1px solid #eaf4ff' }}>
                <span className="modal-label" style={{marginBottom: '4px'}}>Usuario seleccionado</span>
                <div style={{ fontWeight: '900', color: '#111', fontSize: '1.1rem' }}>{editingUser.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#405268', fontWeight: '600' }}>{editingUser.email}</div>
              </div>
              <label className="modal-label">Asignar Rol</label>
              <select 
                className="modal-select" 
                value={newRole} 
                onChange={(e) => setNewRole(e.target.value)}
                disabled={user?.rol !== 'Super Administrador' && editingUser.role === 'Super Administrador'}
              >
                <option value="Usuario">Usuario (Estudiante)</option>
                {user?.rol === 'Super Administrador' && (
                  <>
                    <option value="Administrador">Administrador</option>
                    <option value="Super Administrador">Super Administrador</option>
                  </>
                )}
              </select>
              <div className="modal-actions">
                <button className="btn-modal cancel" onClick={closeEditModal}>Cancelar</button>
                <button className="btn-modal save" onClick={handleSaveRole}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        )}

        <section className="generic-card" aria-label="Encabezado">
          <h1 className="title">Administración de la plataforma</h1>
          <p className="subtitle">Supervisa el rendimiento y gestiona los roles de acceso del sistema.</p>
        </section>

        <div className="admin-layout-grid">
          <aside className="admin-sidebar-col" aria-label="Menú admin">
            <section className="generic-card" aria-label="Perfil">
              <div className="profile">
                <div className="avatar" />
                <div>
                  <p className="profile-name">{user?.username ?? 'Admin'}</p>
                  <p className="profile-role">
                    {status === 'authenticated' ? (user?.rol ?? 'Administrador') : 'Invitado'}
                  </p>
                </div>
              </div>
            </section>
            <section className="generic-card" aria-label="Navegación">
              <div className="nav">
                <button type="button" className={`navbtn ${activeSection === 'usuarios' ? 'active' : ''}`} onClick={() => setActiveSection('usuarios')}><Icon name="users" /> Usuarios</button>
                <button type="button" className={`navbtn ${activeSection === 'cursos' ? 'active' : ''}`} onClick={() => setActiveSection('cursos')}><Icon name="courses" /> Cursos edición</button>
                <button type="button" className={`navbtn ${activeSection === 'configuracion' ? 'active' : ''}`} onClick={() => setActiveSection('configuracion')}><Icon name="settings" /> Configuración</button>
              </div>
            </section>
          </aside>

          <section className="admin-main-col" aria-label="Contenido admin">
            
            {/* =========================================
                PESTAÑA 1: GESTIÓN DE USUARIOS 
                ========================================= */}
            {activeSection === 'usuarios' && (
              <>
                <section className="generic-card" aria-label="Barra de herramientas">
                  <div className="toolbar">
                    <div className="toolbar-left">
                      <div className="admin-search-box" role="search">
                        <Icon name="search" />
                        <input
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Buscar solo por nombre o usuario..."
                          aria-label="Buscar usuarios"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="footerRow" aria-label="Resumen">
                    <p className="mini">Sección: {pageTitle}</p>
                    <p className="mini">Total usuarios: {filteredUsers.length}</p>
                  </div>
                </section>

                <section className="generic-card" aria-label="Tabla">
                  <div className="tablewrap" role="region" aria-label="Listado de usuarios" tabIndex={0}>
                    {loadingUsers ? (
                      <div style={{ padding: '40px', textAlign: 'center', fontWeight: '900', color: '#1a4e8a', fontSize: '1.2rem' }}>Cargando usuarios desde la base de datos...</div>
                    ) : (
                      <>
                        <table>
                          <thead>
                            <tr>
                              <th style={{ width: 40 }}>#</th>
                              <th>NOMBRE</th>
                              <th>ROL</th>
                              <th>CORREO</th>
                              <th style={{ width: 100 }}>% AVANCE</th>
                              <th style={{ width: 140 }}>ÚLTIMA CONEXIÓN</th>
                              <th style={{ width: 110, textAlign: 'center' }}>ACCIONES</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedUsers.length ? (
                              paginatedUsers.map((u, index) => {
                                const realIndex = (currentPage - 1) * itemsPerPage + index + 1;
                                return (
                                  <tr key={u.id}>
                                    <td className="muted">{realIndex}</td>
                                    <td>{u.name}</td>
                                    <td className="muted">{u.role}</td>
                                    <td><span className="pill">{u.email}</span></td>
                                    <td><span className={`pct ${progressTone(u.progress)}`}>{u.progress}%</span></td>
                                    <td><span className="muted">{formatDate(u.lastconnection)}</span></td>
                                    <td style={{ textAlign: 'center' }}>
                                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                        <button className="action-btn edit" onClick={() => openEditModal(u)} title="Editar Rol">
                                          <Icon name="edit" />
                                        </button>
                                        {user?.id !== u.id && (
                                          <button className="action-btn delete" onClick={() => handleDeleteUser(u)} title="Eliminar Usuario">
                                            <Icon name="trash" />
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan={7} style={{ padding: 24, textAlign: 'center' }}>
                                  <span className="muted">Sin resultados para “{String(query || '').trim()}”.</span>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {totalPages > 1 && (
                          <div className="pagination">
                            <button 
                              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                              disabled={currentPage === 1}
                            >
                              Anterior
                            </button>
                            <span className="page-info">
                              Página {currentPage} de {totalPages}
                            </span>
                            <button 
                              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                              disabled={currentPage === totalPages}
                            >
                              Siguiente
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </section>
              </>
            )}

            {/* =========================================
                  PESTAÑA 2: EDICIÓN DE CURSOS Y MÓDULOS
                  ========================================= */}
              {activeSection === 'cursos' && (
                <>
                  <section className="generic-card" aria-label="Barra de herramientas de cursos">
                    <div className="toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      
                      <div className="toolbar-left" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, color: '#1a4e8a', fontSize: '1.4rem' }}>Gestor de Contenido</h2>
                        
                        {/* Selector de Cursos (Pronto lo llenaremos con la BD) */}
                        <select 
                          className="admin-select" 
                          style={{ padding: '10px 16px', fontSize: '1.1rem', minWidth: '280px', borderRadius: '6px', border: '2px solid #ccc', backgroundColor: '#ffffff', color: '#333333', fontWeight: '600', cursor: 'pointer', outline: 'none' }}
                          value={selectedCurso}
                          onChange={handleCursoChange}
                        >
                          {cursos.map(curso => (
                            <option key={curso.id} value={curso.id}>Curso: {curso.nombre}</option>
                          ))}
                          <option value="nuevo" style={{ fontStyle: 'italic', color: '#1a4e8a' }}>+ Crear nuevo curso...</option>
                        </select>
                      </div>

                      <div className="toolbar-right">
                        <button 
                          className="primary-btn" 
                          style={{ padding: '8px 16px', backgroundColor: '#1a4e8a', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                          onClick={openNewModuleModal}
                        >
                          Nuevo Módulo
                        </button>
                      </div>

                    </div>
                  </section>

                  <section className="generic-card" aria-label="Tabla de módulos">
                    <div className="tablewrap" role="region" aria-label="Listado de módulos" tabIndex={0}>
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: 60 }}>ORDEN</th>
                            <th>NOMBRE DEL MÓDULO</th>
                            <th>DESCRIPCIÓN</th>
                            <th style={{ width: 120, textAlign: 'center' }}>LECCIONES</th>
                            <th style={{ width: 140, textAlign: 'center' }}>ESTADO</th>
                            <th style={{ width: 110, textAlign: 'center' }}>ACCIONES</th>
                          </tr>
                        </thead>
                        <tbody>
                            {loadingModulos ? (
                              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Cargando módulos...</td></tr>
                            ) : modulos.length > 0 ? (
                              modulos.map((mod) => (
                                <tr key={mod.id}>
                                  <td className="muted">{mod.orden}</td>
                                  <td style={{ fontWeight: 'bold' }}>{mod.titulo}</td>
                                  <td className="muted">{mod.descripcion || 'Sin descripción'}</td>
                                  <td style={{ textAlign: 'center' }}><span className="pill">{mod.total_lecciones} Lecciones</span></td>
                                  <td style={{ textAlign: 'center' }}>
                                    <span className={`pct ${mod.estado === 'Publicado' ? 'high' : 'low'}`}>{mod.estado}</span>
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                      <button className="action-btn edit" title="Editar Módulo" onClick={() => openEditModuleModal(mod)}>
                                        <Icon name="edit" />
                                      </button>
                                      <button className="action-btn delete" title="Eliminar Módulo" onClick={() => confirmDeleteModule(mod)}>
                                        <Icon name="trash" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No hay módulos en este curso aún.</td></tr>
                            )}
                          </tbody>
                      </table>
                    </div>
                  </section>
                </>
              )}

            {/* =========================================
                PESTAÑA 3: CONFIGURACIÓN 
                ========================================= */}
            {activeSection === 'configuracion' && (
              <section className="generic-card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
                <Icon name="settings" style={{ width: 64, height: 64, color: '#1a4e8a', marginBottom: '20px' }} />
                <h2 style={{ color: '#1a4e8a', fontSize: '1.8rem', marginBottom: '10px' }}>Configuración del Sistema</h2>
                <p style={{ color: '#405268', maxWidth: '500px', lineHeight: '1.6' }}>
                  Ajustes globales de la plataforma y variables de entorno.
                </p>
              </section>
            )}

            {/* MODAL DE CONFIRMACIÓN PARA ELIMINAR */}
            {isConfirmModalOpen && (
              <div 
                onClick={() => setIsConfirmModalOpen(false)}
                style={{
                  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.75)', 
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  zIndex: 10000,
                  fontFamily: 'Arial, Helvetica, sans-serif' // <-- FUENTE ARIAL
                }}
              >
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  style={{ 
                    backgroundColor: '#ffffff', width: '100%', maxWidth: '400px', 
                    padding: '30px', borderRadius: '12px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    display: 'flex', flexDirection: 'column', gap: '15px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ color: '#e74c3c', marginBottom: '10px' }}>
                    <Icon name="trash" style={{ width: 48, height: 48 }} />
                  </div>
                  <h3 style={{ color: '#333', margin: '0', fontSize: '1.4rem' }}>
                    Eliminar Módulo
                  </h3>
                  <p style={{ color: '#555', lineHeight: '1.5', margin: '10px 0 20px 0' }}>
                    ¿Estás seguro que deseas eliminar el módulo <strong>"{moduleToDelete?.titulo}"</strong>?<br/>Esta acción no se puede deshacer.
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => setIsConfirmModalOpen(false)}
                      style={{ 
                        padding: '10px 20px', backgroundColor: '#e2e6ea', color: '#333', 
                        border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' 
                      }}
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={executeDeleteModule}
                      style={{ 
                        padding: '10px 20px', backgroundColor: '#e74c3c', color: '#ffffff', 
                        border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' 
                      }}
                    >
                      Sí, eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
              {/* MODAL PARA CREAR NUEVO MÓDULO */}
                {isModuleModalOpen && (
                  <div 
                    onClick={() => setIsModuleModalOpen(false)}
                    style={{
                      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.75)', 
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      zIndex: 9999
                    }}
                  >
                    <div 
                      onClick={(e) => e.stopPropagation()} 
                      style={{ 
                        backgroundColor: '#ffffff', 
                        width: '100%', maxWidth: '500px', 
                        padding: '30px', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        display: 'flex', flexDirection: 'column', gap: '15px'
                      }}
                    >
                      <h3 style={{ color: '#1a4e8a', margin: '0 0 10px 0', fontSize: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                        {editingModuleId ? 'Editar Módulo' : 'Crear Nuevo Módulo'}
                      </h3>
                      
                          <form onSubmit={handleSaveModule} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>                        <div>
                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333333' }}>
                            Título del Módulo <span style={{ color: '#e74c3c' }}>*</span>
                          </label>
                          <input 
                            type="text" 
                            value={newModuleTitle} 
                            onChange={(e) => setNewModuleTitle(e.target.value)} 
                            placeholder="Ej: Módulo 11 - Introducción..."
                            style={{ 
                              width: '100%', padding: '12px', borderRadius: '6px', 
                              border: '1px solid #ccc', backgroundColor: '#ffffff',
                              color: '#333333', fontSize: '1rem', boxSizing: 'border-box',
                              outline: 'none'
                            }}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333333' }}>
                            Descripción
                          </label>
                          <textarea 
                            value={newModuleDesc} 
                            onChange={(e) => setNewModuleDesc(e.target.value)} 
                            placeholder="Breve descripción de lo que se aprenderá..."
                            style={{ 
                              width: '100%', padding: '12px', borderRadius: '6px', 
                              border: '1px solid #ccc', backgroundColor: '#ffffff',
                              color: '#333333', fontSize: '1rem', minHeight: '90px', 
                              resize: 'vertical', boxSizing: 'border-box', outline: 'none'
                            }}
                          />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                          <button 
                            type="button" 
                            onClick={() => setIsModuleModalOpen(false)}
                            style={{ 
                              padding: '10px 18px', backgroundColor: '#e2e6ea', color: '#333333', 
                              border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' 
                            }}
                          >
                            Cancelar
                          </button>
                          <button 
                            type="submit" 
                            style={{ 
                              padding: '10px 18px', backgroundColor: '#1a4e8a', color: '#ffffff', 
                              border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' 
                            }}
                          >
                            Guardar Módulo
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {/* TOAST NOTIFICATION */}
            {toastMessage && (
              <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: toastMessage.type === 'error' ? '#e74c3c' : '#2ecc71',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 10000,
                fontWeight: 'bold',
                animation: 'fadein 0.5s, fadeout 0.5s 2.5s'
              }}>
                {toastMessage.message}
              </div>
            )}
          </section>
        </div>
      </main>
    </Shell>
  );
}