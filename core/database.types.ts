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
      categ: {
        Row: {
          categ_id: number
          name_categ: string
          subcateg: string | null
        }
        Insert: {
          categ_id?: number
          name_categ: string
          subcateg?: string | null
        }
        Update: {
          categ_id?: number
          name_categ?: string
          subcateg?: string | null
        }
        Relationships: []
      }
      clothing_item: {
        Row: {
          clothing_item_gender: string
          clothing_item_id: number
          clothing_item_name: string
          is_favorite: boolean
          outfit_abrigado: boolean | null
          times_used: number
          u_c_id: number | null
          user_id: string
        }
        Insert: {
          clothing_item_gender: string
          clothing_item_id?: number
          clothing_item_name: string
          is_favorite: boolean
          outfit_abrigado?: boolean | null
          times_used: number
          u_c_id?: number | null
          user_id: string
        }
        Update: {
          clothing_item_gender?: string
          clothing_item_id?: number
          clothing_item_name?: string
          is_favorite?: boolean
          outfit_abrigado?: boolean | null
          times_used?: number
          u_c_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clothing_item_u_c_id_fkey"
            columns: ["u_c_id"]
            isOneToOne: false
            referencedRelation: "img_clothes"
            referencedColumns: ["u_c_id"]
          },
          {
            foreignKeyName: "clothing_item_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      clothing_item_categ: {
        Row: {
          categ_id: number
          clothing_item_id: number
        }
        Insert: {
          categ_id: number
          clothing_item_id: number
        }
        Update: {
          categ_id?: number
          clothing_item_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "clothing_item_categ_categ_id_fkey"
            columns: ["categ_id"]
            isOneToOne: false
            referencedRelation: "categ"
            referencedColumns: ["categ_id"]
          },
          {
            foreignKeyName: "clothing_item_categ_clothing_item_id_fkey"
            columns: ["clothing_item_id"]
            isOneToOne: false
            referencedRelation: "clothing_item"
            referencedColumns: ["clothing_item_id"]
          },
        ]
      }
      clothing_item_color: {
        Row: {
          clothing_item_id: number
          color_id: number
        }
        Insert: {
          clothing_item_id: number
          color_id: number
        }
        Update: {
          clothing_item_id?: number
          color_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "clothing_item_color_clothing_item_id_fkey"
            columns: ["clothing_item_id"]
            isOneToOne: false
            referencedRelation: "clothing_item"
            referencedColumns: ["clothing_item_id"]
          },
          {
            foreignKeyName: "clothing_item_color_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["color_id"]
          },
        ]
      }
      clothing_item_material: {
        Row: {
          clothing_item_id: number
          material_id: number
        }
        Insert: {
          clothing_item_id: number
          material_id: number
        }
        Update: {
          clothing_item_id?: number
          material_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "clothing_item_material_clothing_item_id_fkey"
            columns: ["clothing_item_id"]
            isOneToOne: false
            referencedRelation: "clothing_item"
            referencedColumns: ["clothing_item_id"]
          },
          {
            foreignKeyName: "clothing_item_material_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["material_id"]
          },
        ]
      }
      clothing_item_style: {
        Row: {
          clothing_item_id: number
          style_id: number
        }
        Insert: {
          clothing_item_id: number
          style_id: number
        }
        Update: {
          clothing_item_id?: number
          style_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "color_item_style_clothing_item_id_fkey"
            columns: ["clothing_item_id"]
            isOneToOne: false
            referencedRelation: "clothing_item"
            referencedColumns: ["clothing_item_id"]
          },
          {
            foreignKeyName: "color_item_style_style_id_fkey"
            columns: ["style_id"]
            isOneToOne: false
            referencedRelation: "style"
            referencedColumns: ["style_id"]
          },
        ]
      }
      color: {
        Row: {
          brightness: number | null
          color_code: string
          color_id: number
          color_name: string
        }
        Insert: {
          brightness?: number | null
          color_code: string
          color_id?: number
          color_name: string
        }
        Update: {
          brightness?: number | null
          color_code?: string
          color_id?: number
          color_name?: string
        }
        Relationships: []
      }
      img_clothes: {
        Row: {
          created_at: string | null
          id_categ: number
          image_original_url: string | null
          image_process_url: string | null
          image_thumbnail_url: string | null
          name_u_c: string | null
          u_c_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id_categ: number
          image_original_url?: string | null
          image_process_url?: string | null
          image_thumbnail_url?: string | null
          name_u_c?: string | null
          u_c_id?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id_categ?: number
          image_original_url?: string | null
          image_process_url?: string | null
          image_thumbnail_url?: string | null
          name_u_c?: string | null
          u_c_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "img_clothes_id_categ_fkey"
            columns: ["id_categ"]
            isOneToOne: false
            referencedRelation: "categ"
            referencedColumns: ["categ_id"]
          },
          {
            foreignKeyName: "img_clothes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      material: {
        Row: {
          material_id: number
          material_name: string
        }
        Insert: {
          material_id?: number
          material_name: string
        }
        Update: {
          material_id?: number
          material_name?: string
        }
        Relationships: []
      }
      model: {
        Row: {
          is_public: boolean
          model_date: string
          model_id: number
          model_name: string | null
          model_popular: number
          published_at: string | null
          user_id: string
        }
        Insert: {
          is_public?: boolean
          model_date: string
          model_id?: number
          model_name?: string | null
          model_popular: number
          published_at?: string | null
          user_id: string
        }
        Update: {
          is_public?: boolean
          model_date?: string
          model_id?: number
          model_name?: string | null
          model_popular?: number
          published_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      model_clothing_item: {
        Row: {
          clothing_item_id: number
          model_id: number
        }
        Insert: {
          clothing_item_id: number
          model_id: number
        }
        Update: {
          clothing_item_id?: number
          model_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "model_clothing_item_clothing_item_id_fkey"
            columns: ["clothing_item_id"]
            isOneToOne: false
            referencedRelation: "clothing_item"
            referencedColumns: ["clothing_item_id"]
          },
          {
            foreignKeyName: "model_clothing_item_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "model"
            referencedColumns: ["model_id"]
          },
        ]
      }
      model_style: {
        Row: {
          model_id: number
          style_id: number
        }
        Insert: {
          model_id: number
          style_id: number
        }
        Update: {
          model_id?: number
          style_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "model_style_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "model"
            referencedColumns: ["model_id"]
          },
          {
            foreignKeyName: "model_style_style_id_fkey"
            columns: ["style_id"]
            isOneToOne: false
            referencedRelation: "style"
            referencedColumns: ["style_id"]
          },
        ]
      }
      style: {
        Row: {
          style_id: number
          style_name: string
        }
        Insert: {
          style_id?: number
          style_name: string
        }
        Update: {
          style_id?: number
          style_name?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          user_birthdate: string | null
          user_country: string | null
          user_id: string
          user_name: string | null
          user_status: number
          user_up_date: string
        }
        Insert: {
          user_birthdate?: string | null
          user_country?: string | null
          user_id: string
          user_name?: string | null
          user_status?: number
          user_up_date?: string
        }
        Update: {
          user_birthdate?: string | null
          user_country?: string | null
          user_id?: string
          user_name?: string | null
          user_status?: number
          user_up_date?: string
        }
        Relationships: []
      }
      user_color: {
        Row: {
          color_id: number
          user_id: string
        }
        Insert: {
          color_id: number
          user_id: string
        }
        Update: {
          color_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_color_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["color_id"]
          },
          {
            foreignKeyName: "user_color_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_style: {
        Row: {
          style_id: number
          user_id: string
        }
        Insert: {
          style_id: number
          user_id: string
        }
        Update: {
          style_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_style_style_id_fkey"
            columns: ["style_id"]
            isOneToOne: false
            referencedRelation: "style"
            referencedColumns: ["style_id"]
          },
          {
            foreignKeyName: "user_style_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
