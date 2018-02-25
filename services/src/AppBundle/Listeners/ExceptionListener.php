<?php

/**
 * Created by PhpStorm.
 * User: jose
 * Date: 6/29/16
 * Time: 11:10 AM
 */

namespace AppBundle\Listeners;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ExceptionListener {



    public function onKernelException(GetResponseForExceptionEvent $event) {
        $exception = $event->getException();
        if ($exception instanceof AccessDeniedException) {
            $response=new JsonResponse(array('success'=>false,'error'=>'You have not permission to execute this action'));
            $response->headers->set('X-Status-Code',200);
            $event->setResponse($response);
            $event->stopPropagation();
            return;
        } else {
            $response=new JsonResponse(array('success'=>false,'error'=>$exception->getMessage()));
            $response->headers->set('X-Status-Code',200);
            $event->setResponse($response);
            $event->stopPropagation();
        }
    }

}
