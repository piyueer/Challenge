<?php
namespace App\Http\Controllers;

use App\Models\Offering;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchasesController extends Controller
{
    public function getAllOfferings()
    {
        $offerings = Offering::all()->toArray();

        return json_encode(['offerings' => $offerings]);
    }

    public function getPurchases()
    {
        $purchases = Purchase::with(['offering'])->get()->toArray();

        return json_encode(['purchases' => $purchases]);
    }

    public function postPurchases(Request $request)
    {
        $parameters = $request->all();

        Purchase::insert([
            'customerName' => $parameters['customerName'],
            'offeringID' => $parameters['offeringID'],
            'quantity' => $parameters['quantity']
        ]);

        return 'ok';
    }
}