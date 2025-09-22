import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Camera
} from 'lucide-react'

const SettingsPage = ({ currentUser }) => {
  const [settings, setSettings] = useState({
    // Perfil
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    role: currentUser?.role || '',
    bio: '',
    
    // Notificações
    emailNotifications: true,
    pushNotifications: false,
    commentNotifications: true,
    likeNotifications: false,
    
    // Privacidade
    profilePublic: true,
    showEmail: false,
    allowMessages: true,
    
    // Aparência
    darkMode: false,
    compactMode: false,
    showAvatars: true
  })

  const handleSave = () => {
    // Simular salvamento
    alert('Configurações salvas com sucesso!')
  }

  const handleAvatarChange = () => {
    // Simular mudança de avatar
    alert('Funcionalidade de upload de avatar será implementada em breve!')
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <User className="mx-auto text-muted-foreground mb-4" size={48} />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Login Necessário
          </h2>
          <p className="text-muted-foreground">
            Você precisa estar logado para acessar as configurações
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      {/* Perfil */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <User className="text-primary" size={20} />
          <h2 className="text-xl font-semibold text-card-foreground">
            Perfil
          </h2>
        </div>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center overflow-hidden">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <User size={24} className="text-primary-foreground" />
              )}
            </div>
            <div>
              <Button variant="outline" size="sm" onClick={handleAvatarChange}>
                <Camera size={14} className="mr-2" />
                Alterar Foto
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG ou GIF. Máximo 2MB.
              </p>
            </div>
          </div>

          {/* Campos do perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => setSettings({...settings, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Cargo/Função</Label>
            <Input
              id="role"
              value={settings.role}
              onChange={(e) => setSettings({...settings, role: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              value={settings.bio}
              onChange={(e) => setSettings({...settings, bio: e.target.value})}
              placeholder="Conte um pouco sobre você..."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Notificações */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="text-primary" size={20} />
          <h2 className="text-xl font-semibold text-card-foreground">
            Notificações
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações por Email</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificações importantes por email
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações Push</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificações no navegador
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Comentários</Label>
              <p className="text-sm text-muted-foreground">
                Notificar quando alguém comentar em seus posts
              </p>
            </div>
            <Switch
              checked={settings.commentNotifications}
              onCheckedChange={(checked) => setSettings({...settings, commentNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Curtidas</Label>
              <p className="text-sm text-muted-foreground">
                Notificar quando alguém curtir seus posts
              </p>
            </div>
            <Switch
              checked={settings.likeNotifications}
              onCheckedChange={(checked) => setSettings({...settings, likeNotifications: checked})}
            />
          </div>
        </div>
      </div>

      {/* Privacidade */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="text-primary" size={20} />
          <h2 className="text-xl font-semibold text-card-foreground">
            Privacidade
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Perfil Público</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que outros usuários vejam seu perfil
              </p>
            </div>
            <Switch
              checked={settings.profilePublic}
              onCheckedChange={(checked) => setSettings({...settings, profilePublic: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mostrar Email</Label>
              <p className="text-sm text-muted-foreground">
                Exibir seu email no perfil público
              </p>
            </div>
            <Switch
              checked={settings.showEmail}
              onCheckedChange={(checked) => setSettings({...settings, showEmail: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Permitir Mensagens</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que outros usuários enviem mensagens privadas
              </p>
            </div>
            <Switch
              checked={settings.allowMessages}
              onCheckedChange={(checked) => setSettings({...settings, allowMessages: checked})}
            />
          </div>
        </div>
      </div>

      {/* Aparência */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Palette className="text-primary" size={20} />
          <h2 className="text-xl font-semibold text-card-foreground">
            Aparência
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Modo Escuro</Label>
              <p className="text-sm text-muted-foreground">
                Usar tema escuro na interface
              </p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Modo Compacto</Label>
              <p className="text-sm text-muted-foreground">
                Usar layout mais compacto para economizar espaço
              </p>
            </div>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => setSettings({...settings, compactMode: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mostrar Avatares</Label>
              <p className="text-sm text-muted-foreground">
                Exibir fotos de perfil dos usuários
              </p>
            </div>
            <Switch
              checked={settings.showAvatars}
              onCheckedChange={(checked) => setSettings({...settings, showAvatars: checked})}
            />
          </div>
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save size={16} />
          <span>Salvar Configurações</span>
        </Button>
      </div>
    </div>
  )
}

export default SettingsPage

