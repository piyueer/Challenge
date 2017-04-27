<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'purchase';

    public function offering()
    {
        return $this->belongsTo('App\Models\offering', 'offeringID', 'id');
    }
}
