<?php
/**
 * RequestLogMiddleware.php
 */

namespace App\Http\Middleware;

use Log;
use Closure;
use Illuminate\Http\Request;

/**
 * ---------------------------------------------------------------------------------------------------------------------------
 * Can be Reused
 * ---------------------------------------------------------------------------------------------------------------------------
 */

// Need to config in app.php
// $app->middleware([
//     App\Http\Middleware\RequestLogMiddleware::class,
// ]);

class RequestLogMiddleware
{

    public function handle( Request $request, Closure $next )
    {
        Log::info( "Request Logged\n" . sprintf("~~~~\n%s~~~~~", (string) $request) );

        return $next($request);
    }
}