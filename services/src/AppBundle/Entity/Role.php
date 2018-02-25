<?php

namespace AppBundle\Entity;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * Role
 *
 * @ORM\Table(name ="tbrol")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\RoleRepository")
 * @UniqueEntity(fields={"rolname"}, message="unique.role")
 */
class Role implements \Symfony\Component\Security\Core\Role\RoleInterface
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="rolname", type="string", length=100,nullable=false)
     *
     */
    private $rolname;

    /**
     * @ORM\Column(name="alias", type="string", length=100,nullable=true)
     *
     */
    private $alias;


    /**
     * @ORM\Column(name="description", type="string", length=255,nullable=false)
     *
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\User", mappedBy="role")
     */
    private $users;


    /**
     * Returns the role.
     *
     * This method returns a string representation whenever possible.
     *
     * When the role cannot be represented with sufficient precision by a
     * string, it should return null.
     *
     * @return string|null A string representation of the role, or null
     */
    public function getRole()
    {
        return $this->rolname;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set rolname
     *
     * @param string $rolname
     * @return Role
     */
    public function setRolname($rolname)
    {
        $this->rolname = $rolname;

        return $this;
    }

    /**
     * Get rolname
     *
     * @return string 
     */
    public function getRolname()
    {
        return $this->rolname;
    }

    /**
     * Set alias
     *
     * @param string $alias
     * @return Role
     */
    public function setAlias($alias)
    {
        $this->alias = $alias;

        return $this;
    }

    /**
     * Get alias
     *
     * @return string 
     */
    public function getAlias()
    {
        return $this->alias;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Role
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Add users
     *
     * @param \AppBundle\Entity\User $users
     * @return Role
     */
    public function addUser(\AppBundle\Entity\User $users)
    {
        $this->users[] = $users;

        return $this;
    }

    /**
     * Remove users
     *
     * @param \AppBundle\Entity\User $users
     */
    public function removeUser(\AppBundle\Entity\User $users)
    {
        $this->users->removeElement($users);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUsers()
    {
        return $this->users;
    }
}
