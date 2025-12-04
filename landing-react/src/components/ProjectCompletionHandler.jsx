import { useState } from 'react';
import { ReviewEmailManager } from '../utils/emailMarketing';

/**
 * Componente de ejemplo: Cómo integrar el sistema de reseñas
 * en el flujo de finalización de proyectos
 */
const ProjectCompletionHandler = () => {
  const [emailManager] = useState(() => new ReviewEmailManager());
  const [completedProjects, setCompletedProjects] = useState([
    {
      id: 1,
      clientName: "María González",
      clientEmail: "maria@email.com",
      projectType: "Logo para empresa de tecnología",
      completedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 días atrás
      status: "completed"
    }
  ]);

  /**
   * Función que se llama cuando se completa un proyecto
   */
  const handleProjectCompletion = async (projectData) => {
    try {
      // 1. Marcar proyecto como completado
      const updatedProject = {
        ...projectData,
        status: 'completed',
        completedDate: new Date()
      };

      // 2. Programar email de solicitud de reseña (7 días después)
      await emailManager.scheduleReviewRequest({
        name: projectData.clientName,
        email: projectData.clientEmail,
        project: projectData.projectType
      });

      // 3. Actualizar estado del proyecto
      setCompletedProjects(prev => [...prev, updatedProject]);

      console.log('Proyecto completado y email de reseña programado:', updatedProject);
      alert('¡Proyecto completado! Se enviará una solicitud de reseña en 7 días.');

    } catch (error) {
      console.error('Error al completar proyecto:', error);
      alert('Error al procesar la finalización del proyecto');
    }
  };

  /**
   * Simular finalización de proyecto (para testing)
   */
  const simulateProjectCompletion = () => {
    const mockProject = {
      id: Date.now(),
      clientName: "Juan Pérez",
      clientEmail: "juan@email.com",
      projectType: "Rediseño de logo corporativo",
      status: "in_progress"
    };

    handleProjectCompletion(mockProject);
  };

  return (
    <div className="project-handler p-8 bg-white border border-[#CBD5E1] rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-light text-[#0D0D12] mb-6">
        Sistema de Finalización de Proyectos
      </h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-[#0D0D12] mb-4">
          Proyectos Completados Recientemente
        </h3>
        <div className="space-y-4">
          {completedProjects.map(project => (
            <div key={project.id} className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-[#0D0D12]">{project.clientName}</h4>
                  <p className="text-[#374151] text-sm">{project.projectType}</p>
                  <p className="text-[#6b7280] text-xs">
                    Completado: {project.completedDate?.toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    Email programado
                  </span>
                  <p className="text-[#6b7280] text-xs mt-1">
                    Se enviará en 7 días
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#CBD5E1] pt-6">
        <h3 className="text-lg font-medium text-[#0D0D12] mb-4">
          Simular Finalización de Proyecto
        </h3>
        <p className="text-[#374151] mb-4">
          Haz clic en el botón para simular la finalización de un proyecto y ver cómo funciona el sistema de reseñas.
        </p>
        <button
          onClick={simulateProjectCompletion}
          className="bg-[#9747FF] text-[#F8FAFC] px-6 py-3 rounded-none font-medium hover:bg-[#8B3DFF] transition-colors duration-300"
        >
          Simular Proyecto Completado
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h4 className="font-medium text-blue-900 mb-2">💡 Cómo funciona:</h4>
        <ol className="text-blue-800 text-sm space-y-1">
          <li>1. Se marca el proyecto como completado</li>
          <li>2. Se programa automáticamente un email de solicitud de reseña</li>
          <li>3. 7 días después, el cliente recibe el email personalizado</li>
          <li>4. El cliente puede dejar su reseña a través del enlace seguro</li>
          <li>5. Tú revisas y apruebas las reseñas en el panel de administración</li>
        </ol>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
        <h4 className="font-medium text-green-900 mb-2">📧 Próximos pasos para producción:</h4>
        <ul className="text-green-800 text-sm space-y-1">
          <li>• Configurar servidor backend (Node.js + MongoDB)</li>
          <li>• Crear cuenta en SendGrid y configurar plantillas</li>
          <li>• Configurar variables de entorno</li>
          <li>• Implementar panel de administración</li>
          <li>• Probar el flujo completo con un proyecto real</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectCompletionHandler;