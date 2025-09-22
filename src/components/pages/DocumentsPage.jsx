import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Download, 
  Filter,
  Search
} from 'lucide-react'
import postsData from '../../data/posts.json'

const DocumentsPage = ({ currentUser, onShowLogin }) => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFilter, setSelectedFilter] = useState('all') // Novo filtro
  const [userInteractions, setUserInteractions] = useState({})

  useEffect(() => {
    setPosts(postsData)
    setFilteredPosts(postsData)
  }, [])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filtro por interações do usuário
    if (selectedFilter !== 'all' && currentUser) {
      filtered = filtered.filter(post => {
        const interaction = userInteractions[post.id]
        if (selectedFilter === 'liked') {
          return interaction?.liked
        } else if (selectedFilter === 'saved') {
          return interaction?.saved
        } else if (selectedFilter === 'both') {
          return interaction?.liked && interaction?.saved
        }
        return true
      })
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedCategory, selectedFilter, userInteractions, currentUser])

  const handleLike = (postId) => {
    if (!currentUser) {
      onShowLogin()
      return
    }

    setUserInteractions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        liked: !prev[postId]?.liked
      }
    }))

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: userInteractions[postId]?.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ))
  }

  const handleSave = (postId) => {
    if (!currentUser) {
      onShowLogin()
      return
    }

    setUserInteractions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        saved: !prev[postId]?.saved
      }
    }))

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            saves: userInteractions[postId]?.saved ? post.saves - 1 : post.saves + 1 
          }
        : post
    ))
  }

  const handleDownload = (postId) => {
    if (!currentUser) {
      onShowLogin()
      return
    }

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, downloads: post.downloads + 1 }
        : post
    ))
    
    // Simular download
    alert('Download iniciado!')
  }

  const handleCardClick = (postId) => {
    const post = posts.find(p => p.id === postId)
    if (post) {
      // Abrir modal ou navegar para página de detalhes
      alert(`Abrindo: ${post.title}`)
      // TODO: Implementar modal de detalhes ou navegação
    }
  }

  const categories = ['all', 'tutorial', 'api', 'discussion']
  const categoryLabels = {
    all: 'Todos',
    tutorial: 'Tutoriais',
    api: 'API',
    discussion: 'Discussões'
  }

  const filters = ['all', 'liked', 'saved', 'both']
  const filterLabels = {
    all: 'Todas',
    liked: 'Curtidas',
    saved: 'Salvas',
    both: 'Curtidas e Salvas'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Biblioteca de Documentos
        </h1>
        <p className="text-muted-foreground">
          Explore nossa coleção de documentações, tutoriais e recursos da comunidade
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              type="text"
              placeholder="Buscar por título, descrição ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 modern-input"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="modern-button"
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </div>
      </div>

      {/* User Interaction Filters */}
      {currentUser && (
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <span className="text-sm font-medium text-muted-foreground">Minhas postagens:</span>
          <div className="flex gap-2">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="modern-button"
              >
                {filterLabels[filter]}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <div 
            key={post.id} 
            className="bg-card rounded-lg modern-card overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(post.id)}
          >
            {/* Image */}
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs">
                  {categoryLabels[post.category]}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center mb-3 text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span className="mx-1">•</span>
                <span>{post.authorRole}</span>
                <span className="mx-1">•</span>
                <span>{post.createdAt}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(post.id)
                    }}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      userInteractions[post.id]?.liked 
                        ? 'text-red-500' 
                        : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart size={14} fill={userInteractions[post.id]?.liked ? 'currentColor' : 'none'} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSave(post.id)
                    }}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      userInteractions[post.id]?.saved 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Bookmark size={14} fill={userInteractions[post.id]?.saved ? 'currentColor' : 'none'} />
                    <span>{post.saves}</span>
                  </button>

                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MessageCircle size={14} />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(post.id)
                  }}
                  className="flex items-center space-x-1 modern-button"
                >
                  <Download size={14} />
                  <span>{post.downloads}</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum documento encontrado com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  )
}

export default DocumentsPage

