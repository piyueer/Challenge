<?php
namespace App\Http\Controllers;

use App\Models\Offering;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchasesController extends Controller
{
    public function getAllOfferings()
    {
        //$rows = Offering::all()->toArray();

        $rows = [
            [
                'id' => 1,
                'title' => 'title 1',
                'price' => 1
            ],
            [
                'id' => 2,
                'title' => 'title 2',
                'price' => 3
            ]
        ];

        return json_encode($rows);
    }

    public function getPurchases()
    {
        // $rows = Purchase::all()->toArray();
        // foreach ($rows as &$row) {
        //     $row['offering'] = Offering::find($row['offering_id'])->toArray();
        // }

        $rows = [
            [
                'id' => 1,
                'customer_name' => 'test_name',
                'offering_id' => 1,
                'quantity' => 1,
                'offering' => [
                    'id' => 1,
                    'title' => 'title 1',
                    'price' => 1
                ]
            ]
        ];

        return json_encode($rows);
    }

    public function postPurchases(Request $request)
    {
        $parameters = $request->all();

        return $parameters;

        // Todo: Validator
        Purchase::insert([
            'customer_name' => $parameters['customer_name'],
            'offering_id' => $parameters['offering_id'],
            'quantity' => $parameters['quantity']
        ]);

        return 'ok';
    }
}