<?php

namespace AppBundle\Listeners;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;


/**
 * Description of ControllerListener
 *
 * @author code
 */
class RequestListener
{

    public function onKernelRequest(GetResponseEvent $event)
    {
        $freeURL = array('/api/users/register','/api/login');
        $request = $event->getRequest();
        $method = $request->getMethod();

        if ('OPTIONS' === $method) {
            $response=new Response('ok');
            $response->headers->set('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Access-Control-Allow-Origin, apiKey");
            $event->setResponse($response);
        } else {
            $uri = $request->getRequestUri();
            $key = $event->getRequest()->headers->get('apiKey');
            if (!in_array($uri, $freeURL) && empty($key)) {
                $event->setResponse(new JsonResponse(array('success' => false, 'error' => 'You have not permission to execute this action')));
                return;
            }

        }
    }
}
