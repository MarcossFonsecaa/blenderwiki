import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Copy, Search, ChevronRight, Code } from 'lucide-react'

const ApiPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSection, setSelectedSection] = useState('getting-started')

  // Simulando dados de API que viriam de arquivos Markdown
  const apiSections = [
    {
      id: 'getting-started',
      title: 'Começando',
      description: 'Introdução à API do Blender',
      content: `# Começando com a API do Blender

A API do Blender permite que você automatize tarefas e crie ferramentas personalizadas para o Blender.

## Instalação

Para começar a usar a API, você precisa ter o Blender instalado:

\`\`\`bash
# Instalar via pip (se usando como módulo Python)
pip install bpy
\`\`\`

## Primeiro Script

Aqui está um exemplo básico:

\`\`\`python
import bpy

# Limpar a cena
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Adicionar um cubo
bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0))

# Salvar o arquivo
bpy.ops.wm.save_as_mainfile(filepath="/tmp/meu_projeto.blend")
\`\`\`
`
    },
    {
      id: 'objects',
      title: 'Manipulação de Objetos',
      description: 'Como criar, modificar e deletar objetos',
      content: `# Manipulação de Objetos

## Criando Objetos

\`\`\`python
import bpy

# Adicionar diferentes tipos de objetos
bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0))
bpy.ops.mesh.primitive_uv_sphere_add(location=(2, 0, 0))
bpy.ops.mesh.primitive_cylinder_add(location=(-2, 0, 0))
\`\`\`

## Modificando Propriedades

\`\`\`python
# Selecionar objeto por nome
obj = bpy.data.objects['Cube']

# Modificar posição
obj.location = (1, 2, 3)

# Modificar escala
obj.scale = (2, 2, 2)

# Modificar rotação (em radianos)
obj.rotation_euler = (0, 0, 1.57)
\`\`\`

## Deletando Objetos

\`\`\`python
# Deletar objeto específico
bpy.data.objects.remove(bpy.data.objects['Cube'], do_unlink=True)

# Deletar todos os objetos selecionados
bpy.ops.object.delete()
\`\`\`
`
    },
    {
      id: 'materials',
      title: 'Materiais e Shaders',
      description: 'Trabalhando com materiais e nodes',
      content: `# Materiais e Shaders

## Criando um Material Básico

\`\`\`python
import bpy

# Criar novo material
material = bpy.data.materials.new(name="MeuMaterial")
material.use_nodes = True

# Obter o node tree
nodes = material.node_tree.nodes
links = material.node_tree.links

# Limpar nodes existentes
nodes.clear()

# Adicionar Principled BSDF
bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
bsdf.location = (0, 0)

# Adicionar Material Output
output = nodes.new(type='ShaderNodeOutputMaterial')
output.location = (300, 0)

# Conectar BSDF ao Output
links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])
\`\`\`

## Configurando Propriedades

\`\`\`python
# Definir cor base
bsdf.inputs['Base Color'].default_value = (0.8, 0.2, 0.1, 1.0)

# Definir metallic
bsdf.inputs['Metallic'].default_value = 0.5

# Definir roughness
bsdf.inputs['Roughness'].default_value = 0.3
\`\`\`

## Aplicar Material ao Objeto

\`\`\`python
# Selecionar objeto
obj = bpy.context.active_object

# Aplicar material
if obj.data.materials:
    obj.data.materials[0] = material
else:
    obj.data.materials.append(material)
\`\`\`
`
    },
    {
      id: 'animation',
      title: 'Animação',
      description: 'Criando animações programaticamente',
      content: `# Animação

## Keyframes Básicos

\`\`\`python
import bpy

# Selecionar objeto
obj = bpy.context.active_object

# Definir frame inicial
bpy.context.scene.frame_set(1)

# Posição inicial
obj.location = (0, 0, 0)
obj.keyframe_insert(data_path="location", frame=1)

# Posição final
bpy.context.scene.frame_set(50)
obj.location = (5, 0, 0)
obj.keyframe_insert(data_path="location", frame=50)
\`\`\`

## Animação de Rotação

\`\`\`python
import math

# Animar rotação completa
for frame in range(1, 101):
    bpy.context.scene.frame_set(frame)
    
    # Calcular rotação baseada no frame
    angle = (frame / 100) * 2 * math.pi
    obj.rotation_euler = (0, 0, angle)
    
    # Inserir keyframe
    obj.keyframe_insert(data_path="rotation_euler", frame=frame)
\`\`\`

## Configurar Timeline

\`\`\`python
# Definir frame inicial e final
scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = 100

# Definir frame rate
scene.render.fps = 24
\`\`\`
`
    }
  ]

  const filteredSections = apiSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentSection = apiSections.find(section => section.id === selectedSection)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Código copiado para a área de transferência!')
  }

  const renderMarkdownContent = (content) => {
    const lines = content.split('\n')
    const elements = []
    let currentCodeBlock = []
    let inCodeBlock = false
    let codeLanguage = ''

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.replace('```', '')
        } else {
          // Fim do bloco de código
          elements.push(
            <div key={`code-${index}`} className="relative bg-muted rounded-lg p-4 my-4">
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant="secondary" 
                  className={`text-xs syntax-highlight ${
                    codeLanguage === 'python' ? 'syntax-python' :
                    codeLanguage === 'javascript' || codeLanguage === 'js' ? 'syntax-js' :
                    codeLanguage === 'css' ? 'syntax-css' :
                    codeLanguage === 'html' ? 'syntax-html' :
                    codeLanguage === 'json' ? 'syntax-json' :
                    codeLanguage === 'bash' ? 'bg-gray-800 text-green-400' :
                    ''
                  }`}
                >
                  {codeLanguage || 'code'}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(currentCodeBlock.join('\n'))}
                  className="flex items-center space-x-1"
                >
                  <Copy size={14} />
                  <span>Copiar</span>
                </Button>
              </div>
              <pre className="text-sm overflow-x-auto">
                <code>{currentCodeBlock.join('\n')}</code>
              </pre>
            </div>
          )
          currentCodeBlock = []
          inCodeBlock = false
          codeLanguage = ''
        }
      } else if (inCodeBlock) {
        currentCodeBlock.push(line)
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl font-bold text-foreground mt-6 mb-4">
            {line.replace('# ', '')}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl font-semibold text-foreground mt-5 mb-3">
            {line.replace('## ', '')}
          </h2>
        )
      } else if (line.trim()) {
        elements.push(
          <p key={index} className="text-muted-foreground mb-3 leading-relaxed">
            {line}
          </p>
        )
      }
    })

    return elements
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Sidebar de navegação */}
      <div className="w-80 border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-card-foreground mb-3">
            Documentação da API
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={14} />
            <Input
              type="text"
              placeholder="Buscar na API..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
        </div>

        <div className="p-2">
          {filteredSections.map(section => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`w-full text-left p-3 rounded-md transition-colors ${
                selectedSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{section.title}</div>
                  <div className="text-xs opacity-70 mt-1">{section.description}</div>
                </div>
                <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {currentSection ? (
            <div className="max-w-4xl">
              <div className="flex items-center space-x-2 mb-6">
                <Code className="text-primary" size={20} />
                <h1 className="text-2xl font-bold text-foreground">
                  {currentSection.title}
                </h1>
              </div>
              
              <div className="prose prose-slate max-w-none">
                {renderMarkdownContent(currentSection.content)}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Code className="mx-auto text-muted-foreground mb-4" size={48} />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Selecione uma seção
                </h2>
                <p className="text-muted-foreground">
                  Escolha uma seção da API na barra lateral para ver a documentação
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApiPage

