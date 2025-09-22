import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  ThumbsUp, 
  Clock,
  User,
  CheckCircle
} from 'lucide-react'

const ForumPage = ({ currentUser, onShowLogin }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')

  // Dados simulados do fórum
  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      title: "Como otimizar renderização para animações longas?",
      content: "Estou trabalhando em uma animação de 5 minutos e a renderização está muito lenta. Alguém tem dicas de otimização?",
      author: "Carlos Oliveira",
      authorRole: "Technical Artist",
      avatar: "/api/placeholder/32/32",
      createdAt: "2024-01-20",
      replies: 8,
      likes: 15,
      solved: false,
      tags: ["renderização", "animação", "otimização"],
      lastReply: "2024-01-22"
    },
    {
      id: 2,
      title: "Erro ao importar modelos FBX",
      content: "Sempre que tento importar um arquivo FBX, o Blender trava. Já tentei diferentes versões do arquivo.",
      author: "Ana Costa",
      authorRole: "Dev",
      avatar: "/api/placeholder/32/32",
      createdAt: "2024-01-18",
      replies: 12,
      likes: 23,
      solved: true,
      tags: ["fbx", "importação", "erro"],
      lastReply: "2024-01-21"
    },
    {
      id: 3,
      title: "Dúvida sobre Geometry Nodes",
      content: "Como posso usar Geometry Nodes para criar uma distribuição procedural de objetos em uma superfície?",
      author: "Maria Santos",
      authorRole: "Dev",
      avatar: "/api/placeholder/32/32",
      createdAt: "2024-01-15",
      replies: 6,
      likes: 31,
      solved: false,
      tags: ["geometry-nodes", "procedural", "distribuição"],
      lastReply: "2024-01-19"
    }
  ])

  const handleNewPost = () => {
    if (!currentUser) {
      onShowLogin()
      return
    }
    setShowNewPost(true)
  }

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const newPost = {
      id: forumPosts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      author: currentUser.name,
      authorRole: currentUser.role,
      avatar: currentUser.avatar,
      createdAt: new Date().toISOString().split('T')[0],
      replies: 0,
      likes: 0,
      solved: false,
      tags: [],
      lastReply: new Date().toISOString().split('T')[0]
    }

    setForumPosts([newPost, ...forumPosts])
    setNewPostTitle('')
    setNewPostContent('')
    setShowNewPost(false)
  }

  const filteredPosts = forumPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Fórum da Comunidade
          </h1>
          <p className="text-muted-foreground">
            Faça perguntas, compartilhe conhecimento e ajude outros usuários
          </p>
        </div>
        
        <Button onClick={handleNewPost} className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Nova Pergunta</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          type="text"
          placeholder="Buscar discussões..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Nova Pergunta
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Título
              </label>
              <Input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Descreva sua pergunta em poucas palavras..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Descrição
              </label>
              <Textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Descreva sua pergunta em detalhes..."
                rows={4}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleSubmitPost}>
                Publicar Pergunta
              </Button>
              <Button variant="outline" onClick={() => setShowNewPost(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                {post.avatar ? (
                  <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-card-foreground hover:text-primary cursor-pointer">
                    {post.title}
                  </h3>
                  {post.solved && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {post.content}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Meta info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{post.author} • {post.authorRole}</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{post.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <ThumbsUp size={14} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MessageSquare size={14} />
                      <span>{post.replies} respostas</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Última resposta: {post.lastReply}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto text-muted-foreground mb-4" size={48} />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhuma discussão encontrada
          </h3>
          <p className="text-muted-foreground mb-4">
            Não encontramos discussões que correspondam à sua busca.
          </p>
          <Button onClick={handleNewPost}>
            Iniciar Nova Discussão
          </Button>
        </div>
      )}
    </div>
  )
}

export default ForumPage

