<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetailKejadian extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'detailkejadian';
    public $timestamps = false;
    
    protected $fillable = [
        'idwilayah', 'idkejadian',

        'meninggal', 'hilang', 'luka', 'mengungsi', 'terdampak'

        
    ];

    public function wilayah()
    {
        return $this->belongsTo(Wilayah::class, 'idwilayah');
    }
    public function kejadian()
    {
        return $this->belongsTo(Kejadian::class, 'idkejadian');
    }
}
