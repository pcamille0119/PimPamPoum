<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    protected $table = 'utilisateur'; // ← adapte ce nom si nécessaire

    protected $primaryKey = 'id_utilisateur';
    public $incrementing = true;
    public $timestamps = false; // si tu n’as pas created_at et updated_at

    protected $fillable = ['nom', 'prenom', 'email', 'mot_de_passe', 'role'];
}

