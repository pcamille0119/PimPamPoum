<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    protected $table = 'utilisateur'; 

    protected $primaryKey = 'id_utilisateur';
    public $incrementing = true;
    public $timestamps = false; 

    protected $fillable = ['nom', 'prenom', 'email', 'mot_de_passe', 'role'];
}

