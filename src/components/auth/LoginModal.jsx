import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import usersData from '../../data/users.json'

const LoginModal = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simular delay de autenticação
    setTimeout(() => {
      const user = usersData.find(
        u => u.username === username && u.password === password
      )

      if (user) {
        onLogin(user)
        onClose()
      } else {
        setError('Usuário ou senha incorretos')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">
            Entrar no BlenderWiki
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X size={16} />
          </Button>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
          </div>
        </form>

        <div className="px-6 pb-6">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">Usuários de teste:</p>
            <div className="bg-muted p-3 rounded-md text-xs space-y-1">
              <div><strong>admin</strong> / admin123</div>
              <div><strong>maria.santos</strong> / maria123</div>
              <div><strong>carlos.oliveira</strong> / carlos123</div>
              <div><strong>ana.costa</strong> / ana123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal

