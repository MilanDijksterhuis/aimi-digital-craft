export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          title: string
          triggered_by_user_id: string | null
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          title: string
          triggered_by_user_id?: string | null
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          triggered_by_user_id?: string | null
          type?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          kind: string
          location: string | null
          notes: string | null
          scheduled_at: string
          status: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          location?: string | null
          notes?: string | null
          scheduled_at: string
          status?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          location?: string | null
          notes?: string | null
          scheduled_at?: string
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          details: Json
          id: string
          target_id: string | null
          target_type: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json
          id?: string
          target_id?: string | null
          target_type: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json
          id?: string
          target_id?: string | null
          target_type?: string
          user_id?: string
        }
        Relationships: []
      }
      change_attachments: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          id: string
          mime_type: string | null
          request_id: string
          size_bytes: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          id?: string
          mime_type?: string | null
          request_id: string
          size_bytes?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
          mime_type?: string | null
          request_id?: string
          size_bytes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "change_attachments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "change_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      change_comments: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          request_id: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          request_id: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "change_comments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "change_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      change_requests: {
        Row: {
          admin_notes: string | null
          archived: boolean
          archived_at: string | null
          archived_by: string | null
          assigned_to: string | null
          cancellation_reason: string | null
          category: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          description: string
          due_date: string | null
          id: string
          internal_note: string | null
          is_paid: boolean
          priority: string
          request_number: number | null
          restored_at: string | null
          restored_by: string | null
          rush: boolean
          status: Database["public"]["Enums"]["request_status"]
          ticket_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          archived?: boolean
          archived_at?: string | null
          archived_by?: string | null
          assigned_to?: string | null
          cancellation_reason?: string | null
          category?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description: string
          due_date?: string | null
          id?: string
          internal_note?: string | null
          is_paid?: boolean
          priority?: string
          request_number?: number | null
          restored_at?: string | null
          restored_by?: string | null
          rush?: boolean
          status?: Database["public"]["Enums"]["request_status"]
          ticket_type?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          archived?: boolean
          archived_at?: string | null
          archived_by?: string | null
          assigned_to?: string | null
          cancellation_reason?: string | null
          category?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string
          due_date?: string | null
          id?: string
          internal_note?: string | null
          is_paid?: boolean
          priority?: string
          request_number?: number | null
          restored_at?: string | null
          restored_by?: string | null
          rush?: boolean
          status?: Database["public"]["Enums"]["request_status"]
          ticket_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          attachments: Json
          body: string | null
          chat_id: string
          created_at: string
          id: string
          is_read: boolean
          sender_id: string
          sender_type: string
        }
        Insert: {
          attachments?: Json
          body?: string | null
          chat_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id: string
          sender_type: string
        }
        Update: {
          attachments?: Json
          body?: string | null
          chat_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          client_id: string
          created_at: string
          id: string
          last_message_at: string
          status: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          last_message_at?: string
          status?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          last_message_at?: string
          status?: string
        }
        Relationships: []
      }
      client_contacts: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          kind: string
          occurred_at: string
          summary: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          occurred_at?: string
          summary: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          occurred_at?: string
          summary?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          handled: boolean
          id: string
          message: string
          name: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          email: string
          handled?: boolean
          id?: string
          message: string
          name: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          handled?: boolean
          id?: string
          message?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      customer_costs: {
        Row: {
          amount_cents: number
          cost_date: string
          created_at: string
          created_by: string | null
          description: string
          id: string
          user_id: string
        }
        Insert: {
          amount_cents: number
          cost_date?: string
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          cost_date?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      extra_change_requests: {
        Row: {
          amount: number
          handled_at: string | null
          handled_by: string | null
          id: string
          requested_at: string
          status: string
          total_eur: number
          user_email: string
          user_id: string
          user_name: string | null
        }
        Insert: {
          amount: number
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          requested_at?: string
          status?: string
          total_eur: number
          user_email: string
          user_id: string
          user_name?: string | null
        }
        Update: {
          amount?: number
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          requested_at?: string
          status?: string
          total_eur?: number
          user_email?: string
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      extra_credits: {
        Row: {
          amount: number
          created_at: string
          granted_by: string | null
          id: string
          reason: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          granted_by?: string | null
          id?: string
          reason?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          granted_by?: string | null
          id?: string
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      login_events: {
        Row: {
          created_at: string
          id: string
          ip: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ip?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_items: {
        Row: {
          created_at: string
          done: boolean
          id: string
          label: string
          position: number
          user_id: string
        }
        Insert: {
          created_at?: string
          done?: boolean
          id?: string
          label: string
          position?: number
          user_id: string
        }
        Update: {
          created_at?: string
          done?: boolean
          id?: string
          label?: string
          position?: number
          user_id?: string
        }
        Relationships: []
      }
      password_reset_requests: {
        Row: {
          handled_at: string | null
          handled_by: string | null
          id: string
          requested_at: string
          status: string
          user_email: string
          user_id: string
          user_name: string | null
        }
        Insert: {
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          requested_at?: string
          status?: string
          user_email: string
          user_id: string
          user_name?: string | null
        }
        Update: {
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          requested_at?: string
          status?: string
          user_email?: string
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          access_expires_at: string | null
          address: string | null
          billing_address: string | null
          btw: string | null
          company: string | null
          contact_person: string | null
          contacts: Json
          created_at: string
          email: string
          free_quota_override: number | null
          full_name: string | null
          id: string
          internal_notes: string | null
          is_blocked: boolean
          kvk: string | null
          last_seen_at: string | null
          monthly_price_cents: number
          package: string | null
          phone: string | null
          referral_code: string | null
          snippet_active: boolean
          tags: string[]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          access_expires_at?: string | null
          address?: string | null
          billing_address?: string | null
          btw?: string | null
          company?: string | null
          contact_person?: string | null
          contacts?: Json
          created_at?: string
          email: string
          free_quota_override?: number | null
          full_name?: string | null
          id: string
          internal_notes?: string | null
          is_blocked?: boolean
          kvk?: string | null
          last_seen_at?: string | null
          monthly_price_cents?: number
          package?: string | null
          phone?: string | null
          referral_code?: string | null
          snippet_active?: boolean
          tags?: string[]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          access_expires_at?: string | null
          address?: string | null
          billing_address?: string | null
          btw?: string | null
          company?: string | null
          contact_person?: string | null
          contacts?: Json
          created_at?: string
          email?: string
          free_quota_override?: number | null
          full_name?: string | null
          id?: string
          internal_notes?: string | null
          is_blocked?: boolean
          kvk?: string | null
          last_seen_at?: string | null
          monthly_price_cents?: number
          package?: string | null
          phone?: string | null
          referral_code?: string | null
          snippet_active?: boolean
          tags?: string[]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      purchase_requests: {
        Row: {
          amount: number
          created_at: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      reply_snippets: {
        Row: {
          body: string
          created_at: string
          created_by: string | null
          id: string
          title: string
        }
        Insert: {
          body: string
          created_at?: string
          created_by?: string | null
          id?: string
          title: string
        }
        Update: {
          body?: string
          created_at?: string
          created_by?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      site_errors: {
        Row: {
          created_at: string
          id: number
          message: string
          resolved: boolean
          resolved_at: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          resolved?: boolean
          resolved_at?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          resolved?: boolean
          resolved_at?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      site_pings: {
        Row: {
          created_at: string
          id: number
          response_ms: number | null
          status_ok: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          response_ms?: number | null
          status_ok?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          response_ms?: number | null
          status_ok?: boolean
          user_id?: string
        }
        Relationships: []
      }
      user_presence: {
        Row: {
          last_seen_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          last_seen_at?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          last_seen_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      available_credits: { Args: { _user_id: string }; Returns: number }
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "admin"
        | "customer"
        | "super_admin"
        | "co_admin"
        | "support_agent"
        | "viewer"
      request_status:
        | "pending"
        | "in_review"
        | "in_progress"
        | "review"
        | "done"
        | "rejected"
        | "approved"
        | "waiting_customer"
        | "invoiced"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "customer",
        "super_admin",
        "co_admin",
        "support_agent",
        "viewer",
      ],
      request_status: [
        "pending",
        "in_review",
        "in_progress",
        "review",
        "done",
        "rejected",
        "approved",
        "waiting_customer",
        "invoiced",
        "cancelled",
      ],
    },
  },
} as const
