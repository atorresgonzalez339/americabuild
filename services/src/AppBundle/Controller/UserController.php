<?php

namespace AppBundle\Controller;

use AppBundle\Libs\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Libs\Normalizer\ResultDecorator;
use JMS\SecurityExtraBundle\Annotation\Secure;


class UserController extends BaseController
{


    /**
     * Return the overall User list.
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Return the overall User List",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     * @Rest\Get("/api/users")
     * @Method({"GET","OPTIONS"})
     *
     */
    public function getAllAction()
    {
        return new View($this->getAllDataOfModel('User'), Response::HTTP_OK);
    }

    /**
     * @Rest\Delete("/api/users/{id}")
     * @Method({"DELETE","OPTIONS"})
     */
    public function deleteAction($id)
    {
        return new View($this->removeModel('User', $id), Response::HTTP_OK);
    }

    /**
     * Create a new User
     * @ApiDoc(
     *   resource = true,
     *   description = "Return an object with property success to inform the result of response an data array with id of new resource create",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     * @Rest\Post("/api/users/register")
     * @Method({"POST","OPTIONS"})
     */
    public function postAction(Request $request)
    {
        $data["username"] = $request->get("username");
        $data["password"] = $request->get("password");
        $data["name"] = $request->get("name");
        $data["role"] = 2;
        $data["active"] = false;
        $save = $this->saveModel('User', $data);
        return new View($save, Response::HTTP_OK);
    }

    /**
     *
     * Update a User
     * @ApiDoc(
     *   resource = true,
     *   description = "Return an object with property success to inform the result of response an data array with id of resource update",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     * @Rest\Put("/api/users")
     * @Method({"PUT","OPTIONS"})
     */
    public function putAction(Request $request)
    {
        $data = $request->request->all();
        unset($data["username"]);
        unset($data["password"]);
        unset($data["salt"]);
        unset($data["token"]);
        if (!isset($data['id']))
        {
            return new View(array("success"=>false,"error"=>"No user identifier provided to performe the update action"), Response::HTTP_OK);
        }
        $user = $this->getRepo('User')->find($data['id']);
        if (!$user)
            return new View(array("success"=>false,"error"=>"User identifier not found"), Response::HTTP_OK);

        $save = $this->saveModel('User', $data);
        return new View($save, Response::HTTP_OK);
    }
}
